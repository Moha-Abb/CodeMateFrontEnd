import { Component, OnInit } from '@angular/core';
import profileUser from 'src/app/interfaces/user-details';
import { ChatService } from 'src/app/services/chat/chat.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  users: profileUser[];

  constructor(private chatService: ChatService) {

    this.users = []
  }

  ngOnInit(): void {
    this.chatService.getUsers().subscribe(user => {
      this.users = user;
      console.log(this.users)
    })
  }
}
