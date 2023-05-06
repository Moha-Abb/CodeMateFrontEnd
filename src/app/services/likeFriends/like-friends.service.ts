import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LikeFriendsService {

  constructor(private firestore: Firestore,) {
  }

  async aceptarSolicitud(amigoId: string, data: object, friendId1: string, friendId2: string): Promise<void> {
    // const amigoRef = doc(this.firestore, 'friends', amigoId);

    // await updateDoc(amigoRef, { estado: 'aceptado' });
    console.log('Solicitud de amistad aceptada correctamente');

    // const result = collection(this.firestore, 'friends' + friendId1)
    // await addDoc(result, data)
    // const result2 = collection(this.firestore, 'friends' + friendId2)
    // await addDoc(result2, data)

  }

  // async obtenerSolicitudes(usuarioId: string) {
  //   const result = collection(this.firestore, 'friends')
  //   const result2 = collectionData(result, { idField: 'id' })

  //   const users = await firstValueFrom(result2);

  //   const isFriend = users.find(u => (u.usuario2 == usuarioId) && (u.estado == 'pendiente'));

  // }

  async obtenerAmigos(usuarioId: string) {
    const result = collection(this.firestore, 'friends')
    const result2 = collectionData(result, { idField: 'id' })

    const users = await firstValueFrom(result2);

    console.log(users)
    // const isFriend = users.find(user => ((user.receiveUser == usuarioId) && (u['estado'] == 'aceptado')));
    console.log(users[0]['receiveUser'])
    // console.log(isFriend)
  }
}
