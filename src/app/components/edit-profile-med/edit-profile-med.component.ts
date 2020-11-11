import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile-med',
  templateUrl: './edit-profile-med.component.html',
  styleUrls: ['./edit-profile-med.component.css']
})
export class EditProfileMedComponent implements OnInit {
 formMedecin:FormGroup;
 id;
 medecin;
  hide=true;
  messageError;
  constructor(private authSer:AuthService,private router:Router,private formBuilder:FormBuilder,private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.authSer.getMedecin(this.route.snapshot.params['id']).subscribe(data=>{

      this.medecin=data
      this.formMedecin=this.formBuilder.group({
        nom:[this.medecin.nom,Validators.required],
        prenom:[this.medecin.prenom,Validators.required],
        phone: [this.medecin.appUser.phone,[Validators.required,Validators.pattern ]],
        adresse: [this.medecin.adresse, Validators.required],
        dateNaissance: [this.medecin.dateNaissance,Validators.required],
        password: ['',Validators.required],
        email:[this.medecin.appUser.email]
      })
    })

  }


  update() {
   this.authSer.editProfileMed(this.formMedecin.value,this.route.snapshot.params['id']).subscribe(data=>{
     this.router.navigateByUrl('/profile')

   },eror => {
     console.log(eror.error.message)
     this.messageError=eror.error.message
   })
  }
  hasError(field: string, error: string) {
    const ctrl = this.formMedecin.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }
}
