import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import {userError} from '@angular/compiler-cli/src/transformers/util';
import {EmailValidator} from '../../email-validator';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreatePatientComponent implements OnInit {

  public patientt;
  public medecin;
  formPatient: FormGroup;
  formDossier: FormGroup;
  messageError;
  //chips
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  message;
  patient;


  constructor(private emailValidator:EmailValidator, private _formBuilder: FormBuilder, public authSer:AuthService, private router:Router) {}

  ngOnInit() {
    this.authSer.getUser().subscribe(data=>{
      this.medecin=data
    })
    this.formPatient = this._formBuilder.group({
      idPat:[-1],
      idMed:[''],
      numeroIdentite: ['', [Validators.required],this.emailValidator.validateNidentitie.bind(this.emailValidator)],
      sexe:['',Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['',[Validators.required,Validators.email],this.emailValidator.validateEmail.bind(this.emailValidator) ],
      phone: ['',[Validators.required,Validators.pattern ]],
      adresse: ['', Validators.required],
      numeroAssurance:['',[Validators.required],this.emailValidator.validateNAssurance.bind(this.emailValidator)],
      dateNaissance: ['',Validators.required],
    });
    this.formDossier = this._formBuilder.group({
      taille: ['', Validators.required],
      poid: ['', Validators.required],
      groupeSanguin:['',Validators.required],
      antecedentsFamiliaux: this._formBuilder.array([]),
      maladies: this._formBuilder.array([]),
      habitudesToxiques: this._formBuilder.array([]),
    });
  }

  hasError(field: string, error: string) {
    const ctrl = this.formPatient.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }
  save() {
    this.patientt={...this.formPatient.value,
      ...this.formDossier.value}
    console.log(this.patientt)
    this.authSer.savePatient(this.patientt).subscribe(data=>{
      this.patient=data;

      this.message={};
      this.message.idMedecin=this.patientt.idMed;
      this.message.idPatient=this.patient.id;
      this.message.contenu='Je suis maitenant votre medecin traitant';
      this.message.fromQui='MEDECIN'
      this.authSer.sendMessage(this.message).subscribe(data=>{});
      this.router.navigateByUrl("/patients")
    },err=>{
      //console.log(err)

      this.messageError=err.error.message
    })
    //console.log(this.formDossier.value)
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




  /*addAntecedent(){
    const antecedent = this._formBuilder.control('',Validators.required)
    this.getAntecedents().push(antecedent)
  }
  removeAntecedent(i) {
    this.getAntecedents().removeAt(i)
  }*/
}
