import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AccessControlGuard } from 'src/app/guards/access-control.guard';
import Message from 'src/app/interfaces/message';
import { Firestore, addDoc, collection, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  currentUser: any;
  newMessage: string = ''
  messages: Message[];
  formReg2: any;
  selectedFriendId: any;

  constructor(private chatService: ChatService,
    private router: Router, private guard: AccessControlGuard,
    private firestore: Firestore, private profileComponent: ProfileComponent) {

    this.formReg2 = new FormGroup({
      idusuario: new FormControl(this.guard.user),
      text: new FormControl('')
    })
    this.messages = []

  }
  ngOnInit(): void {
    this.chatService.getMessages().subscribe(message => {
      this.messages = message;
    })
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.currentUser = JSON.parse(userDataString);
    }
  }
  chatFriend(chatID: string) {
    this.selectedFriendId = chatID;
  }
  async sendMessage() {

    // const response = await this.chatService.sendMessages()


    // Actualice el chat para el amigo seleccionado
    // const chatRef = doc(this.firestore, 'chats', );
    const chatRef = collection(this.firestore, 'chatT' + this.selectedFriendId)

    // await setDoc(chatRef, { lastMessage: this.formReg2.value, timestamp: new Date() }, { merge: true });

    // Agregue el mensaje a la colección de mensajes del chat
    const messagesRef = collection(this.firestore, `chats/${this.selectedFriendId}/messages`);
    await addDoc(messagesRef, {
      senderId: this.currentUser.idusuario,
      message: this.newMessage,
      timestamp: new Date()
    });
    this.newMessage = ''



  }
}
