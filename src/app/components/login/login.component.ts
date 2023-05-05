import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  formReg: any;

  constructor(private userService: UserService, private router: Router) {

    this.formReg = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }


  login() {
    this.userService.login(this.formReg.value)
      .then(response => {
        localStorage.setItem('userData', JSON.stringify(this.formReg.value))
        this.router.navigate(['/profile'])
      })
      .catch(error => console.log(error))
  }

  loginWithGoogle() {

    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response.user)
        localStorage.setItem('userData',
          JSON.stringify({
            email: response.user.email,
            displayName: response.user.displayName,
            photo: response.user.photoURL
          }))

        this.router.navigate(['/profile'])
      }
      )
      .catch(error => console.log(error))
  }
}
