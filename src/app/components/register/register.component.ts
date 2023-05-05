import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/user.service';
import Message from 'src/app/interfaces/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currentUser: any;
  formReg;
  displayName: any;
  photoURL: any;
  userData: any;

  constructor(private userService: UserService, private router: Router, private chatSercive: ChatService) {
    this.formReg = new FormGroup({
      displayName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    })
    this.userData = {}
  }

  register() {
    console.log('Registering user with form values:', this.formReg.value);
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log('Registration successful:', response);
        this.userData = {
          idusuario: response.user?.uid,
          displayName: response.user?.displayName,
          photoURL: response.user?.photoURL
        };
        this.chatSercive.addUser(this.userData)
        this.router.navigate(["/login"])
      })
      .catch(error => console.log('Registration failed:', error))
  }


  async loginWithGoogle() {

    this.userService.loginWithGoogle()
      .then(async response => {

        const user = await this.userService.getCurrentUser();
        this.currentUser = user;
        this.displayName = user?.displayName;
        this.photoURL = user?.photoURL;
        this.userData = {
          idusuario: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL
        };
        console.log(this.userData)
        this.chatSercive.addUser(this.userData)
        this.router.navigate(['/profile'])
      })
      .catch(error => console.log(error))
  }
  ngOnInit(): void {
    console.log('Component initialized.');
  }

}
