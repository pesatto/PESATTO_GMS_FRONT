import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { Company, User } from '../../models/user';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '@coreui/angular-pro';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../../service/company.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  newUser = this.fb.group({
    fullname: ["", [Validators.required, Validators.pattern(RegExp("(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})"))]],
    email: ["", [Validators.required, Validators.email]],
    company: ["", [Validators.required]],
    usertype: ["", [Validators.required]],
    password: ["", [Validators.required]]
  })


  loading = true;
  icons = freeSet;
  users: User[] = []
  original: User[] = []
  userType: User = {
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
  tipos = ["Solo Ver Empresa", "Solo Ver con Comandos Empresa", "Admin Empresa", "Solo Ver Pesatto", "Registro Pesatto", "Admin Pesatto"]
  companies: Company[] = []
  search = ""
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private companyService: CompanyService) {

  }

  ngOnInit(): void {
    this.userType = this.authService.get_user()
    this.loadUsers()

  }
  loadUsers() {
      this.userService.getUsers().subscribe(data => {
      this.loading = false
      this.users = data.data
      this.original = data.data
    })
  }

  addUser() {
    if (this.newUser.valid) {
      this.modalService.toggle({ show: false, id: "staticBackdropModal" })
      let info = {
        fullname: this.newUser.controls.fullname.value,
        email: this.newUser.controls.email.value,
        user_type: this.newUser.controls.usertype.value,
        userpassword: this.newUser.controls.password.value,
        company: this.newUser.controls.company.value
      }
      this.userService.addUser(info).subscribe(data => {
        if (data.error) {
          this.toastr.error(data.message, "Error")
        } else {
          this.loadUsers()
          this.newUser.reset()
          this.modalService.toggle({ show: false, id: "staticBackdropModal" })
          this.toastr.success("Usuario Agregado con Exito", "Exito")
          this.loading = false
        }
      })
    }
  }

  loadCompanies() {
      this.companyService.getCompanies().subscribe(data => this.companies = data.data)
  }

  getUserTypes() {
    if ([3,4,5].includes(this.userType?.user_type!)) {
      return this.tipos
    } else {
      return this.tipos[0-2]
    }
  }

  getUserType(type: number): string {
    return this.tipos[type]
  }

  filterSeach(e: Event) {
    let newvalue = (e.target as HTMLInputElement).value;
    this.users = this.original
    if (newvalue) {
      this.users = this.users.filter(data => (data.fullname.toLowerCase().includes(newvalue.toLowerCase()) || data.email.toLowerCase().includes(newvalue.toLowerCase())))
    } else {
      this.users = this.original
    }
  }
}
