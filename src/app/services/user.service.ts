import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, signInWithPopup, GoogleAuthProvider, getAuth,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ChatService } from './chat/chat.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {


  user: any

  constructor(private auth: Auth, private firestore: Firestore,
    private chatService: ChatService,
  ) {

    this.user = this.auth.currentUser
  }

  register({ displayName, email, password }: any) {

    return createUserWithEmailAndPassword(this.auth, email, password)

  }

  login({ email, password }: any) {

    return signInWithEmailAndPassword(this.auth, email, password)

  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  logOut() {
    return signOut(this.auth)
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

}
