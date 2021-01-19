import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AppService} from '../app.service';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor(private router:Router,private appService:AppService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.appService.loadToken();
    if (!tokenNotExpired('token', this.appService.jwtToken) ) {
      localStorage.removeItem('token');
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }

}
