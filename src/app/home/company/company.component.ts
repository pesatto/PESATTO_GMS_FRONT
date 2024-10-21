import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CompanyService } from '../../service/company.service';
import { Company } from '../../models/user';
import { freeSet } from '@coreui/icons';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { ModalService } from '@coreui/angular-pro';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {

  loading = true;
  icons = freeSet;
  companies: Company[] = []
  userType = 0





  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {
    this.userType = this.authService.getUserType()

    this.loadCompanies()
  }

  loadCompanies() {
    this.loading = true
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data.data
      this.loading = false
    })
  }

  newCompany = this.fb.group({
    name: ["", [Validators.required]],
    rfc: ["", [Validators.required, Validators.minLength(6)]],
  })

  addCompany() {
    if (this.newCompany.valid) {
      this.modalService.toggle({ show: false, id: "staticBackdropModal" })
      let info = {
        name: this.newCompany.controls.name.value!,
        rfc: this.newCompany.controls.rfc.value!,
      }
      this.companyService.addCompany(info).subscribe(data => {
        if (data.error) {
          this.toastr.error(data.message, "Error")
        } else {
          this.loadCompanies()
          this.newCompany.reset()
          this.modalService.toggle({ show: false, id: "staticBackdropModal" })
          this.toastr.success("Empresa Agregada con Exito", "Exito")
          this.loading = false
        }
      })
    }
  }
}
