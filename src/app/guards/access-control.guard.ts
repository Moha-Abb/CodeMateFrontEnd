import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessControlGuard implements CanActivate {


  constructor(private router: Router, private auth: Auth) { }


  user: any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // la comprobacion con if, que no exista token en storage
    this.user = this.auth.currentUser?.uid

    if (!localStorage.getItem('userData')) {

      this.router.navigate(['login']);
      return false;

    } else {
      console.log('else')

      return true;
    }
  }
}
