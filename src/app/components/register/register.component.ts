import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user;
  public mode;
  public messageError;
  showprogressBar=false;

  constructor(private authSer:AuthService,private router:Router) { }

  ngOnInit(): void {
    if (this.authSer.getEmail()!=null) {
      this.router.navigate(['/']);
    }
  }
  onRegister(user) {
    this.showprogressBar=true;
    this.authSer.saveUser(user,0).subscribe(resp=>{
      this.showprogressBar=false;
      this.user=resp;
      this.router.navigateByUrl("/confirme/"+this.user.id)
    },err=>{
      console.log(err.error.message)
      this.mode=1;
      this.messageError=err.error.message;

    });

  }

}
