import { Component } from '@angular/core';
import { LikeFriendsService } from 'src/app/services/likeFriends/like-friends.service';

@Component({
  selector: 'app-accept-request-frriend',
  templateUrl: './accept-request-frriend.component.html',
  styleUrls: ['./accept-request-frriend.component.css']
})
export class AcceptRequestFRriendComponent {

  constructor(private amigosService: LikeFriendsService) { }

  aceptarSolicitud(): void {
    const amigoId = 'amigoId'; // ID del amigo en la colección de amigos
    // this.amigosService.aceptarSolicitud(amigoId);
  }

}
