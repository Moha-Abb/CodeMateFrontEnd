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

    console.log('Solicitud de amistad aceptada correctamente');
  }

  async obtenerAmigos(usuarioId: string) {
    const result = collection(this.firestore, 'friends')
    const result2 = collectionData(result, { idField: 'id' })
    const users = await firstValueFrom(result2);
  }
}
