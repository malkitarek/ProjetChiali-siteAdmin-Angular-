import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile-pat',
  templateUrl: './edit-profile-pat.component.html',
  styleUrls: ['./edit-profile-pat.component.css']
})
export class EditProfilePatComponent implements OnInit {
  patient;
  formPatient: FormGroup
  hide;
  messageError;

  constructor(private authSer: AuthService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.authSer.getUser().subscribe(data => {

      this.patient = data
      this.formPatient = this.formBuilder.group({
        nom: [this.patient.nom, Validators.required],
        prenom: [this.patient.prenom, Validators.required],
        phone: [this.patient.appUser.phone, [Validators.required, Validators.pattern]],
        adresse: [this.patient.adresse, Validators.required],
        dateNaissance: [this.patient.dateNaissance, Validators.required],
        password: ['', Validators.required],
        email: [this.patient.appUser.email]
      })
    })

  }


  update() {
    this.authSer.editProfilePat(this.formPatient.value, this.route.snapshot.params['id']).subscribe(data => {
      this.router.navigateByUrl('/profile')

    }, eror => {
      console.log(eror.error.message)
      this.messageError = eror.error.message
    })
  }

  hasError(field: string, error: string) {
    const ctrl = this.formPatient.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }
}
