import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PasswordValidator} from '../../password-validator';
import {ConfirmedValidator} from '../../confirmed.validator';

@Component({
  selector: 'app-changer-password',
  templateUrl: './changer-password.component.html',
  styleUrls: ['./changer-password.component.css']
})
export class ChangerPasswordComponent implements OnInit {
  formChange:FormGroup;
  hide=true;
  hide2=true;
  hide3=true;
  username;
  constructor(private appService:AppService,private formBuilder:FormBuilder,private route:ActivatedRoute,private router:Router,public passwordValidator:PasswordValidator) { }

  ngOnInit(): void {

    this.formChange=this.formBuilder.group({
      username:[this.appService.getUsername()],
      actuel:['',[Validators.required],this.passwordValidator.validatePassword.bind(this.passwordValidator)],
      password:['',Validators.required],
      repassword:['',Validators.required]
    },     {
      validator: ConfirmedValidator('password', 'repassword')
    })

  }

  update() {
    this.username=this.appService.getUsername()
   this.appService.changeMdp(this.formChange.value,this.username).subscribe(data=>{
      this.appService.logout();
      window.location.reload();
    },err=>{
      console.log(err);
    })
  }

  hasError(field: string, error: string) {
    const ctrl = this.formChange.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

}
