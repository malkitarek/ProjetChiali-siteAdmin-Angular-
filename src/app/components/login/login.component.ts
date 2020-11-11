import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt';
import {Location} from '@angular/common';
import {PatientComponent} from '../patient/patient.component';
import {AppComponent} from '../../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public mode;
  public user;
  public messageError;
  public roles;
  constructor(private authSer:AuthService,private router:Router) { }

  ngOnInit(): void {
    if (this.authSer.getEmail()!=null) {
     this.router.navigateByUrl("/patients").then(() => {
        window.location.reload();
      });
      //this.router.navigateByUrl("/patients")
    }

  }

  onLogin(user) {
    this.authSer.login(user).subscribe(resp=>{
      let jwt = resp.headers.get("authorization");

      let jwtHelper=new JwtHelper();
      this.roles=jwtHelper.decodeToken(jwt).roles;

      for (let r of this.roles){
        if(r.authority=="MEDECIN" || r.authority=="PATIENT") {
          this.authSer.saveToken(jwt);
          this.authSer.isConnected=true;

          this.router.navigateByUrl("/patients").then(() => {
            window.location.reload();
          });
        }
        else {
          this.mode=1
        }}
        /*if(this.authSer.isAdmin(jwt)) {this.mode=1;}
        else {
          this.authSer.saveToken(jwt);
          this.router.navigateByUrl("/patients");
        }*/



    },err=>{
      console.log(err)
      this.mode=1;
     // this.messageError=err.error.message
    });
  }



}
