import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmedValidator} from '../../confirmed.validator';
import {PasswordValidator} from '../../password-validator';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  formChange:FormGroup;
  hide;
  hide2;
  hide3;
  username;


  constructor(private authSer:AuthService,private formBuilder:FormBuilder,private route:ActivatedRoute,private router:Router,public passwordValidator:PasswordValidator) { }

  ngOnInit(): void {

    this.formChange=this.formBuilder.group({
      email:[this.authSer.getEmail()],
      actuel:['',[Validators.required],this.passwordValidator.validatePassword.bind(this.passwordValidator)],
      password:['',Validators.required],
      repassword:['',Validators.required]
    },     {
  validator: ConfirmedValidator('password', 'repassword')
})

  }

  update() {
    this.username=this.authSer.getEmail()
    this.authSer.changeMdp(this.formChange.value,this.username).subscribe(data=>{
      this.authSer.logout();
      this.router.navigateByUrl("login").then(() => {
        window.location.reload();
      });
    },err=>{
      console.log(err);
    })
  }

  hasError(field: string, error: string) {
    const ctrl = this.formChange.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }
}
