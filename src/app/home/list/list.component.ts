import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnitService } from '../../service/unit.service';
import { Model, Unit } from '../../models/unit';
import { Router } from '@angular/router';
import { freeSet } from '@coreui/icons';
import { ModelService } from '../../service/model.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Company, User } from '../../models/user';
import { CompanyService } from '../../service/company.service';
import { ModalService } from "@coreui/angular-pro"
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
import { SocketService } from '../../service/socket.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnDestroy, OnInit {


  loading = true

  units: Unit[] = []
  models: Model[] = []
  companies: Company[] = []
  icons = freeSet;
  user: User = {
    _id: '',
    fullname: '',
    email: '',
    user_type: 0,
    userpassword: '',
    active: false,
    __v: 0,
    company: {
      _id: '',
      name: '',
      rfc: '',
      __v: 0
    }
  }
  ids: string[] = []

  constructor(private socketService: SocketService, private authService: AuthService, private toastr: ToastrService, private modalService: ModalService, private unitService: UnitService, private router: Router, private fb: FormBuilder, private modelService: ModelService, private companyService: CompanyService) {
    this.user = authService.get_user()

  }

  ngOnInit(): void {

    this.getUnits()
  }

  ngOnDestroy(): void {
    this.socketService.disconnect()
  }


  getUnits() {
    this.unitService.getUnits().subscribe(data => {
      if (data.error) {
        this.toastr.error(data.message, "Error")
      } else {
        this.units = data.data
        this.loading = false

        this.units.forEach(unit => this.ids.push(unit._id))

        this.socketService.connect()
        this.socketService.join(this.ids)
        this.socketService.socket_listener(data => {
          let index = this.units.findIndex(x => x._id == data._id)
          this.units[index] = { ... this.units[index], ...data.data }
        })
      }
    })
  }

  gensetAdd = this.fb.group({
    nombre: ["", [Validators.required]],
    modelo: ["", [Validators.required]],
    sim: ["", [Validators.required, Validators.minLength(5)]],
    hostid: ["", [Validators.required, Validators.minLength(5)]],
    company: ["", [Validators.required]],
    serial: ["", [Validators.required, Validators.minLength(8)]]
  })

  openGenset(arg0: string) {
    this.router.navigate(["/home/unit/" + arg0])
  }

  calculate(should: number, is: number) {
    return (is * 100) / should
  }
  loadModels() {
    this.modelService.getModels().subscribe(data => this.models = data.data)
    this.companyService.getCompanies().subscribe(data => this.companies = data.data)
  }

  test() {
    this.toastr.info("Prueba")
  }

  addUnit() {
    if (this.gensetAdd.valid) {
      let unit = {
        name: this.gensetAdd.controls.nombre.value,
        model: this.gensetAdd.controls.modelo.value,
        company: this.gensetAdd.controls.company.value,
        simcard: this.gensetAdd.controls.sim.value,
        hostid: this.gensetAdd.controls.hostid.value,
        serial: this.gensetAdd.controls.serial.value
      }

      this.unitService.addUnit(unit).subscribe(data => {
        if (data.error) {
          this.toastr.error(data.message, "Error")
        } else {
          this.getUnits()
          this.gensetAdd.reset()
          this.modalService.toggle({ show: false, id: "staticBackdropModal" })
          this.toastr.success("Unidad agregada con exito", "Exito !")
          this.loading = false
        }
      })
    } else {
      this.toastr.error("Faltan datos para agregar")
    }

  }

}
