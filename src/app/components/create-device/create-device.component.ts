import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import {PatDeviceValidator} from '../../patDevice-validator';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.css']
})
export class CreateDeviceComponent implements OnInit {
  formDevice: FormGroup;
   medecin;
   patients;
   //capteursList;
   selected;

  constructor(private authService:AuthService,private formBuilder:FormBuilder,private router:Router,public patientValidator:PatDeviceValidator) { }

  ngOnInit(): void {

    this.getPatients()
   // this.getCapteurs()

    this.formDevice=this.formBuilder.group({
      id:[-1],
      nom:['',Validators.required],
      description:['',Validators.required],
      patientId:['',[Validators.required],this.patientValidator.validatePatient.bind(this.patientValidator)],
      //capteurs:['',Validators.required]
    })

  }
  hasError(field: string, error: string) {
    const ctrl = this.formDevice.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }
  /*getCapteurs(){
    this.authService.getCapteurs().subscribe(data=>{
      this.capteursList=data;
    },err=>{
      console.log(err)
    })
  }*/

  getPatients(){
    this.authService.getUser().subscribe(data=>{
      this.medecin=data;
      this.authService.getMembres(this.medecin.id).subscribe(data=>{
        this.patients=data;
      })
    })
  }

  save() {
    console.log(this.formDevice.value)
    if(this.formDevice.valid){
      this.authService.saveDevice(this.formDevice.value).subscribe(data=>{
        this.router.navigateByUrl("/devices");
      })
    }

  }

}
