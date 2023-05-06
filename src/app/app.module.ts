import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { AngularFireModule } from '@angular/fire/compat';
// import { FirestoreModule } from '@angular/fire/firestore';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';


import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChatComponent } from './components/chat/chat.component';
import { MainComponent } from './components/main/main.component';
import { RequestFRriendComponent } from './components/request-frriend/request-frriend.component';
import { AcceptRequestFRriendComponent } from './components/friends/accept-request-frriend/accept-request-frriend.component';
import { FRriendsListComponent } from './components/friends/f-rriends-list/f-rriends-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    ChatComponent,
    MainComponent,
    RequestFRriendComponent,
    AcceptRequestFRriendComponent,
    FRriendsListComponent,
    UserProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
