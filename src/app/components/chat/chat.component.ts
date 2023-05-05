import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AccessControlGuard } from 'src/app/guards/access-control.guard';
import Message from 'src/app/interfaces/message';


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

  constructor(private chatService: ChatService, private router: Router, private guard: AccessControlGuard) {
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
  async sendMessage() {
    const response = await this.chatService.sendMessages(this.formReg2.value)
    this.newMessage = ''
  }
}
