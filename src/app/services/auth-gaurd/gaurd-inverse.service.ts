import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth-service/auth.service';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class GaurdInverseService implements CanActivate{

  constructor(private authServ:AuthService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authServ.loadToken();
    if (!tokenNotExpired('token', this.authServ.jwtToken) ) {
      return true;
    } else {
      //this.router.navigate(['/login']);
      return false;
    }
  }


}
