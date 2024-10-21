import { Component } from '@angular/core';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { AuthGeneric } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginform = this.fb.group({
    useremail: ['', [Validators.required, Validators.email]],
    userpassword: ['', [Validators.required, Validators.minLength(4)]]
  })

  message = ""
  loading = false

  constructor(public iconSet: IconSetService, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    iconSet.icons = { cilUser, cilLockLocked };
    if (authService.isAuthenticated()) {
      router.navigate(["/home"])
    }
  }
  login() {
    if (!this.loginform.valid) {
      this.message = "Hay un error. Verifica los datos."
    } else {
      this.authService.authLogin(this.loginform.controls.useremail.value!, this.loginform.controls.userpassword.value!).subscribe(data => {
        if (data.error) {
          this.message = data.message
        } else {
          this.router.navigate(['/home'])
        }
      })
    }
  }


}
