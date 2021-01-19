import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {JwtHelper} from 'angular2-jwt';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode;
  roles;

  constructor(private appService:AppService,private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(user) {
    this.appService.login(user.value).subscribe(resp=>{
      let jwt = resp.headers.get("Authorization");
      this.appService.saveToken(jwt);
      let jwtHelper=new JwtHelper();
      this.roles=jwtHelper.decodeToken(jwt).roles;
      for (let r of this.roles){
        if(r.authority=="ADMIN"){
          this.router.navigateByUrl("/plombiers").then(() => {
            window.location.reload();
        })
        }else{
          this.mode=1;
        }
      }
      },error => {
      console.log(error);
      this.mode=1;
    });
    }
}
