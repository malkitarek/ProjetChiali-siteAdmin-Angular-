import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {AuthService} from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-confirme',
  templateUrl: './confirme.component.html',
  styleUrls: ['./confirme.component.css']
})
export class ConfirmeComponent implements OnInit {
  public id;
  public mode;
  public messageError;
  constructor(private activeRoute:ActivatedRoute,private authSer:AuthService,private router:Router) { }

  ngOnInit(): void {
    if (this.authSer.getEmail()!=null) {
      this.router.navigate(['/']);
    }
  }

  onConfirme(code) {
    //this.id=this.activeRoute.snapshot.params.id;
    this.id=this.router.routerState.snapshot.url.split("/")[2];
    console.log(this.id)
    this.authSer.saveCode(code,this.id).subscribe(resp=>{

      this.router.navigateByUrl("/login");
    },err=>{
      console.log(err)
      this.mode=1;
      this.messageError=err.error.message;

    });
}
}
