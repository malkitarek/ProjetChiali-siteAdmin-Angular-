import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forget-mdp',
  templateUrl: './forget-mdp.component.html',
  styleUrls: ['./forget-mdp.component.css']
})
export class ForgetMdpComponent implements OnInit {
 public user;
 public mode;
 public messageError;
  constructor(private authSer:AuthService,private router:Router) { }

  ngOnInit(): void {
    if (this.authSer.getEmail()!=null) {
      this.router.navigate(['/']);
    }
  }

  onRegister(user) {
    this.authSer.saveUser(user,1).subscribe(resp=>{

      this.user=resp;
      this.router.navigateByUrl("/confirme/"+this.user.id)
    },err=>{
      this.mode=1;
      this.messageError=err.error.message;

    });

  }
}
