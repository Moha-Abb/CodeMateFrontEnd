import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccessControlGuard } from './guards/access-control.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MainComponent } from './components/main/main.component';
import { ContacttComponent } from './components/contactt/contactt.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { LoginGuardGuard } from './guards/login-guard.guard';


const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'home'
  },
  { path: 'home', component: HomeComponent },
  { path: 'contacto', component: ContacttComponent },
  { path: 'sobrenosotros', component: SobreNosotrosComponent },
  {
    path: 'login', component: LoginComponent,
    canActivate: [LoginGuardGuard]
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile/:id', component: ProfileComponent
    , canActivate: [AccessControlGuard]
  },
  {
    path: 'profile', component: ProfileComponent
    , canActivate: [AccessControlGuard]
  },
  { path: 'main', component: MainComponent, canActivate: [AccessControlGuard] },
  { path: '**', component: PageNotFoundComponent }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
