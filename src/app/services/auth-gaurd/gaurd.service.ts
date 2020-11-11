import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {AuthService} from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GaurdService implements CanActivate{

  constructor(private authServ:AuthService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authServ.loadToken();
    if (tokenNotExpired("token",this.authServ.jwtToken)) {
      let jwtHelper=new JwtHelper();

      return true;

    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
