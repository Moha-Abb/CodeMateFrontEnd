import { Component } from '@angular/core';
import { LikeFriendsService } from 'src/app/services/likeFriends/like-friends.service';
import { ProfileComponent } from '../../profile/profile.component';
@Component({
  selector: 'app-f-rriends-list',
  templateUrl: './f-rriends-list.component.html',
  styleUrls: ['./f-rriends-list.component.css']
})
export class FRriendsListComponent {
  amigos: any[] = [];
  friendsAccepted: any[] = [];

  constructor(private amigosService: LikeFriendsService,
    private profileComponent: ProfileComponent) {


    console.log(this.profileComponent.friendsAccepted)
  }

  ngOnInit(): void {
    // this.amigosService.obtenerAmigos('usuarioId').subscribe((amigos) => {
    //   this.amigos = amigos;
    // });

  }

  // eliminarAmigo(amigoId: string): void {
  //   this.amigosService.eliminarAmigo(amigoId);
  // }
}
