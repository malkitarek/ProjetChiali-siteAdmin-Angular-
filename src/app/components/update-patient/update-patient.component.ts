import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {EmailValidator} from '../../email-validator';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {IdentiteValidator} from '../../identite-validator';
import {AssuranceValidator} from '../../assurance-validator';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class UpdatePatientComponent implements OnInit {

  public patientt;
  public medecin;
  formPatient: FormGroup;
  formDossier: FormGroup;
  messageError;
  id;
  patient;
  public messageErrorDroit;
  //chips
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];


  constructor(private assuranceValidator:AssuranceValidator,private identiteValidator:IdentiteValidator,private emailValidator:EmailValidator, private _formBuilder: FormBuilder, public authSer:AuthService, private router:Router, private route:ActivatedRoute) {}

  ngOnInit() {
    this.authSer.getUser().subscribe(data=>{
      this.medecin=data

      this.id=this.route.snapshot.params['id'];
      this.authSer.getMembre(this.id,this.medecin.id).subscribe(data=>{

        this.patient=data;

        this.formPatient = this._formBuilder.group({
          idPat:[this.id?this.id:''],
          idMed:[this.medecin.id?this.medecin.id:''],
          numeroIdentite: [this.patient.numeroIdentite,[Validators.required],this.identiteValidator.validateNidentitie.bind(this.identiteValidator)],
          nom: [this.patient.nom, Validators.required],
          sexe:[this.patient.sexe,Validators.required],
          prenom: [this.patient.prenom, Validators.required],
          email: [this.patient.appUser.email,[Validators.required,Validators.email],this.emailValidator.validateEmail.bind(this.emailValidator)],
          phone: [this.patient.appUser.phone,[Validators.required,Validators.pattern ]],
          numeroAssurance:[this.patient.numeroAssurance,[Validators.required],this.assuranceValidator.validateNAssurance.bind(this.assuranceValidator)],
          adresse: [this.patient.adresse, Validators.required],
          dateNaissance: [this.patient.dateNaissance,Validators.required],

        });
        this.formDossier = this._formBuilder.group({
          taille: [this.patient.dossierMedecal?this.patient.dossierMedecal.taille:'', Validators.required],
          groupeSanguin:[this.patient.dossierMedecal?this.patient.dossierMedecal.groupeSanguin:'',Validators.required],
          poid: [this.patient.dossierMedecal?this.patient.dossierMedecal.poid:'', Validators.required],
          antecedentsFamiliaux: this._formBuilder.array(this.patient.dossierMedecal?this.patient.dossierMedecal.antecedentsFamiliaux:[]),
          maladies: this._formBuilder.array(this.patient.dossierMedecal?this.patient.dossierMedecal.maladies:[]),
          habitudesToxiques: this._formBuilder.array(this.patient.dossierMedecal?this.patient.dossierMedecal.habitudesToxiques:[]),
        });



      },err=>{
        console.log(err);
        this.messageErrorDroit=err.error.message
      });

    })

  }

  hasError(field: string, error: string) {
    const ctrl = this.formPatient.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }


  getAntecedents(){
    return this.formDossier.get('antecedentsFamiliaux') as FormArray
  }
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our requirement
    if ((value || '').trim()) {
      const antecedentsFamiliaux = this.formDossier.get('antecedentsFamiliaux') as FormArray;
      antecedentsFamiliaux.push(this._formBuilder.control(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(index: number): void {
    const antecedentsFamiliaux = this.formDossier.get('antecedentsFamiliaux') as FormArray;

    if (index >= 0) {
      antecedentsFamiliaux.removeAt(index);
    }
  }

  getMaladies(){
    return this.formDossier.get('maladies') as FormArray
  }

  addMaladie(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our requirement
    if ((value || '').trim()) {
      const maladies = this.formDossier.get('maladies') as FormArray;
      maladies.push(this._formBuilder.control(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeMaladie(index: number): void {
    const maladies = this.formDossier.get('maladies') as FormArray;

    if (index >= 0) {
      maladies.removeAt(index);
    }
  }

  getHabitudesToxiques(){
    return this.formDossier.get('habitudesToxiques') as FormArray
  }

  addHabitude(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our requirement
    if ((value || '').trim()) {
      const habitudesToxiques = this.formDossier.get('habitudesToxiques') as FormArray;
      habitudesToxiques.push(this._formBuilder.control(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeHabitude(index: number): void {
    const habitudesToxiques = this.formDossier.get('habitudesToxiques') as FormArray;

    if (index >= 0) {
      habitudesToxiques.removeAt(index);
    }
  }

  update() {
    this.patientt={...this.formPatient.value,
      ...this.formDossier.value}
    console.log(this.patientt)
    this.authSer.updatePatient(this.patientt,this.id).subscribe(data=>{
      this.router.navigateByUrl("/membres")
    },err=>{
      //console.log(err)
      /*this.formPatient.controls['email'].setValidators([err.error.message]);
      this.formPatient.controls["email"].updateValueAndValidity();*/
      this.messageError=err.error.message
    })
  }



  /*getAntecedents(){
    return this.formDossier.get('antecedentsFamiliaux') as FormArray
  }
  addAntecedent(){
    const antecedent = this._formBuilder.control('',Validators.required)
    this.getAntecedents().push(antecedent)
  }
  removeAntecedent(i) {
    this.getAntecedents().removeAt(i)
  }*/

}
