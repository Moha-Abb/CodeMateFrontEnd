import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import profileUser from 'src/app/interfaces/user-details';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  formReg: any;
  currentUser: any;
  displayName: any;
  photoURL: any;
  userData: any;
  users: profileUser[];

  constructor(private userService: UserService, private router: Router,
    private chatSercive: ChatService, private firestore: Firestore) {

    this.formReg = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
    this.users = []
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
      .then(async response => {
        const user = await this.userService.getCurrentUser();
        this.currentUser = user;

        const users$ = this.chatSercive.getUsers();
        const users = await firstValueFrom(users$);

        const userExist = users.find(u => u.idusuario == user?.uid);

        if (!userExist) {
          this.displayName = user?.displayName;
          this.photoURL = user?.photoURL;
          this.userData = {
            idusuario: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
            email: user?.email
          };
          this.chatSercive.addUser(this.userData)
        }
        localStorage.setItem('userData',
          JSON.stringify({
            idusuario: user?.uid,
            email: user?.email,
            displayName: user?.displayName,
            photo: user?.photoURL
          }))


        this.router.navigate(['/profile'], { queryParams: { id: user?.uid } });


      });


  }


}
