import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AppService} from '../app.service';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class GuardInverseService implements CanActivate{
  constructor(private appService:AppService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.appService.loadToken();
    if (!tokenNotExpired('token', this.appService.jwtToken) ) {
      localStorage.removeItem('token');
      return true;
    } else {
      return false;
    }
  }
}
