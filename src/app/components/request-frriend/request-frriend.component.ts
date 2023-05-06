import { Component } from '@angular/core';
import { LikeFriendsService } from 'src/app/services/likeFriends/like-friends.service';
import { ProfileComponent } from '../profile/profile.component';
@Component({
  selector: 'app-request-frriend',
  templateUrl: './request-frriend.component.html',
  styleUrls: ['./request-frriend.component.css']
})
export class RequestFRriendComponent {
  solicitudes: any[] = [];

  constructor(private amigosService: LikeFriendsService,
    private profileCo: ProfileComponent) {

    this.solicitudes = this.profileCo.solicitudes
    console.log(this.solicitudes)
  }

  ngOnInit(): void {
    // this.amigosService
    //   .obtenerSolicitudes('usuarioId')
    //   .subscribe((solicitudes) => {
    //     this.solicitudes = solicitudes;
    //   });

  }


  aceptarSolicitud(amigoId: string): void {
    // this.amigosService.aceptarSolicitud(amigoId);
  }
}
