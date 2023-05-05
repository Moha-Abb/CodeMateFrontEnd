import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { UserProfile } from 'firebase/auth';
import { Observable } from 'rxjs'
import Message from 'src/app/interfaces/message';
import profileUser from 'src/app/interfaces/user-details';
@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor(private firestore: Firestore) { }

  sendMessages(data: Message) {
    const result = collection(this.firestore, 'chat')
    return addDoc(result, data)
  }

  getMessages(): Observable<Message[]> {

    const result = collection(this.firestore, 'chat')
    return collectionData(result, { idField: 'idusuario' }) as Observable<Message[]>
  }

  getUsers(): Observable<profileUser[]> {

    const result = collection(this.firestore, 'users')
    return collectionData(result, { idField: 'id' }) as Observable<profileUser[]>
  }

  addUser(data: profileUser) {
    const result = collection(this.firestore, 'users')
    return addDoc(result, data)
  }
}
