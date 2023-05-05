import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  suerProfile!: Observable<any>;


  userData: any;
  constructor(private userService: UserService, private router: Router,
    private route: ActivatedRoute,
    private firestore: Firestore) {
    this.userData = {}

  }
  ngOnInit(): void {

    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.currentUser = JSON.parse(userDataString);
    }
    // this.currentUser = this.userService.getCurrentUser()
    console.log(this.currentUser)

    const id = this.route.snapshot.paramMap.get('id');
    // this.suerProfile = collection(this.firestore,'users')
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
