import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, doc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { LikeFriendsService } from 'src/app/services/likeFriends/like-friends.service';
import profileUser from 'src/app/interfaces/user-details';
import { FormControl, FormGroup } from '@angular/forms';
import { onSnapshot, orderBy } from 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  suerProfile!: Observable<any>;
  amigos: any[];
  id: string;
  userData: any;
  solicitudes: any[] = [];
  currentRequest: any[] = [];
  currentRequest2: any[] = [];
  currentRequest3: any[] = [];
  oneUserRegisted: any | undefined;
  noRequesFriend: any | undefined;

  friendsAccepted: any[] = [];
  friendsotherlUserDataResult: any[] = [];
  FriendsArray: any[] = [];


  amigoAgregado?: boolean
  usersRegisted: any;
  nameFriend: any;
  photoFriend: any;
  nameFriendObject: any;
  currentUserData: any;

  newMessage: string = ''
  messages: [];
  formReg2: any;
  selectedFriendId: any;
  ChatFriendContent: any;
  userChat: string | undefined;
  chatMessages: any;
  unsubscribe: import("@angular/fire/firestore").Unsubscribe | undefined;

  constructor(private userService: UserService, private router: Router,
    private route: ActivatedRoute,
    private firestore: Firestore, private amigosService: LikeFriendsService) {
    this.userData = {}

    this.amigos = []
    this.id = ''
    this.oneUserRegisted = undefined;

    this.formReg2 = new FormGroup({
      idusuario: new FormControl(),
      text: new FormControl('')
    })
    this.messages = []

  }
  async ngOnInit(): Promise<void> {

    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.currentUser = JSON.parse(userDataString);
    }

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];

    });
    const usersRresult = collection(this.firestore, 'users')
    const usersRresultIds = collectionData(usersRresult, { idField: 'id' })
    this.usersRegisted = await firstValueFrom(usersRresultIds);

    const friendsotherlUser = collection(this.firestore, 'friendRequests' + this.id)
    const friendsotherlUserData = collectionData(friendsotherlUser, { idField: 'id' })
    this.friendsotherlUserDataResult = await firstValueFrom(friendsotherlUserData)


    this.oneUserRegisted = this.usersRegisted.filter((usert: { idusuario: string; }) => usert.idusuario == this.id);
    this.currentUserData = this.usersRegisted.filter((usert: { idusuario: string; }) => usert.idusuario == this.currentUser.idusuario);

    const result = collection(this.firestore, 'friendRequests' + this.currentUser.idusuario)

    const friends = collectionData(result, { idField: 'id' })

    const users = await firstValueFrom(friends);
    //lista de las solicitudes
    this.solicitudes = users;
    this.currentRequest = this.solicitudes.filter(solicitud => solicitud.receiveUser == this.currentUser.idusuario);
    this.currentRequest2 = this.solicitudes.filter(solicitud => (solicitud.senderUser == this.currentUser.idusuario && this.id == solicitud.receiveUser));


    this.noRequesFriend = this.currentRequest2.some(solicitud => solicitud.receiveUser == this.currentUser.idusuario)

    this.currentRequest3 = this.solicitudes.filter(solicitud => (solicitud.senderUser == this.id && solicitud.receiveUser == this.currentUser.idusuario));

    // para obetener lista de amigos y buscar nombre del amigo
    this.friendsAccepted = this.solicitudes.filter(solicitud => ((solicitud.receiveUser == this.currentUser.idusuario || solicitud.senderUser == this.currentUser.idusuario) && solicitud.estado == 'aceptado'));

    const realfriends = collection(this.firestore, 'friends' + this.id)
    const realfriendsData = collectionData(realfriends, { idField: 'id' })

    const realfriendsDataDetails = await firstValueFrom(realfriendsData);


  }

  async agregarAmigo(amigoId: string): Promise<void> {

    const amigoRef = collection(this.firestore, 'friendRequests' + this.currentUser.idusuario);
    const amigoRef3 = collection(this.firestore, 'friendRequests' + this.id);


    await addDoc(amigoRef, {
      amigoNombre: this.oneUserRegisted[0].displayName,
      amigoID: this.oneUserRegisted[0].idusuario,
      amigoPhoto: this.oneUserRegisted[0].photoURL,
      estado: 'pendiente',
      receiveUser: this.id,
      senderUser: this.currentUser.idusuario,
      NameSender: this.currentUser.displayName,
    });
    await addDoc(amigoRef3, {
      amigoNombre: this.currentUser.displayName,
      amigoID: this.currentUser.idusuario,
      amigoPhoto: this.currentUser.photo,
      estado: 'pendiente',
      receiveUser: this.id,
      senderUser: this.currentUser.idusuario,
      NameSender: this.currentUser.displayName,
    });

    const amigoRef2 = collection(this.firestore, 'friends' + this.currentUser.idusuario);
    await addDoc(amigoRef2, { idAmigo: this.id, fotoAmigo: this.oneUserRegisted[0].photoURL, nombreAmigo: this.oneUserRegisted[0].displayName, estado: 'pendiente' });

    console.log('Solicitud de amistad enviada correctamente');
    this.amigoAgregado = true;

  }

  async aceptarSolicitud(amigoId: string): Promise<void> {

    // const data = { receiveUser: this.id, senderUser: this.currentUser.idusuario, NameSender: this.currentUser.displayName, estado: 'amigos' }
    // this.amigosService.aceptarSolicitud(amigoId, data, this.currentUser.idusuario, this.id);
    // console.log(amigoId)
    // this.amigosService.obtenerAmigos(amigoId);
    const result = collection(this.firestore, 'friendRequests' + amigoId)
    const friends = collectionData(result, { idField: 'id' })
    const requestFriendsColection = await firstValueFrom(friends)

    const request = requestFriendsColection.find(solicitud => (solicitud['senderUser'] == amigoId));
    for (let requestIn of this.solicitudes) {
      if (requestIn.amigoID == amigoId) {
        const amigoRef = doc(this.firestore, 'friendRequests' + this.currentUser.idusuario, requestIn.id);
        await updateDoc(amigoRef, { estado: 'aceptado' });
      }
    }
    const amigoRef2 = doc(this.firestore, 'friendRequests' + amigoId, request?.['id']);

    await updateDoc(amigoRef2, { estado: 'aceptado' });
    location.reload();
  }

  async chatFriend(chatID: string) {
    this.ChatFriendContent = this.friendsAccepted.find(solicitud => (solicitud.amigoID == chatID));
    this.userChat = chatID;

    const friendsotherlUser = collection(this.firestore, `chats/${chatID}+${this.currentUser.idusuario}/messages`)
    const realfriendsData = collectionData(friendsotherlUser, { idField: 'id' })

    // Agregamos el onSnapshot al documento de mensajes del chat
    onSnapshot(friendsotherlUser, (snapshot) => {
      this.chatMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      this.chatMessages = this.chatMessages.map((msg: { timestamp: { toDate: () => any; }; }) => {
        return { ...msg, timestamp: msg.timestamp.toDate() };
      });
      this.chatMessages.sort((a: { timestamp: { getTime: () => number; }; }, b: { timestamp: { getTime: () => number; }; }) => a.timestamp.getTime() - b.timestamp.getTime());
    })

    const realfriendsDataDetails = await firstValueFrom(realfriendsData);

    this.chatMessages = realfriendsDataDetails
    this.chatMessages = this.chatMessages.map((msg: { timestamp: { toDate: () => any; }; }) => {
      return { ...msg, timestamp: msg.timestamp.toDate() };
    });
    this.chatMessages.sort((a: { timestamp: { getTime: () => number; }; }, b: { timestamp: { getTime: () => number; }; }) => a.timestamp.getTime() - b.timestamp.getTime());

    console.log(this.chatMessages)
  }
  async sendMessage() {

    const chatRef = collection(this.firestore, `chats/${this.userChat}+${this.currentUser.idusuario}/messages`);
    const chatRef2 = collection(this.firestore, `chats/${this.currentUser.idusuario}+${this.userChat}/messages`);
    console.log(this.userChat)
    await addDoc(chatRef, {
      senderId: this.currentUser.idusuario,
      message: this.newMessage,
      timestamp: new Date()
    });
    await addDoc(chatRef2, {
      receiveId: this.userChat,
      message: this.newMessage,
      timestamp: new Date()
    });

    const friendsotherlUser = collection(this.firestore, `chats/${this.userChat}+${this.currentUser.idusuario}/messages`)
    const realfriendsData = collectionData(friendsotherlUser, { idField: 'id' })
    const realfriendsDataDetails = await firstValueFrom(realfriendsData);
    this.chatMessages = realfriendsDataDetails
    this.chatMessages = this.chatMessages.map((msg: { timestamp: { toDate: () => any; }; }) => {
      return { ...msg, timestamp: msg.timestamp.toDate() };
    });
    this.chatMessages = this.chatMessages.sort((a: { timestamp: { getTime: () => number; }; }, b: { timestamp: { getTime: () => number; }; }) => a.timestamp.getTime() - b.timestamp.getTime());

    this.newMessage = ''
  }
  logOut() {
    this.userService.logOut()
      .then(response => {

        localStorage.removeItem('userData')
        this.router.navigate(['/home'])
      })
      .catch(error => console.log(error))
  }

}
