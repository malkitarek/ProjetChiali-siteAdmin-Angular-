import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSelectChange} from '@angular/material/select';
import {PatDeviceValidator} from '../../patDevice-validator';

@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.css']
})
export class UpdateDeviceComponent implements OnInit {
  formDevice: FormGroup;
  patients;
  id;
  medecin;
  device;
  selected;
  //capteursNoSelect;

  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute,private formBuilder:FormBuilder,public patientValidator:PatDeviceValidator) {

  }

  ngOnInit(): void {
    this.getPatients()

    //this.getCapteursNoSelect()
    this.id=this.route.snapshot.params["id"];

    this.authService.getDevice(this.id).subscribe(data=>{

      this.device=data


      this.formDevice=new FormGroup({
        id:new FormControl(this.device.id,Validators.required),
        nom:new FormControl(this.device.nom,[Validators.required]),
        description:new FormControl(this.device.description,Validators.required),
        patientId:new FormControl(this.device.patientId,[Validators.required],this.patientValidator.validatePatient.bind(this.patientValidator)),
        //capteurs: new FormControl(this.device.capteurs, Validators.required)
      })

    })

  }

  hasError(field: string, error: string) {
    const ctrl = this.formDevice.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }
  getPatients(){
    this.authService.getUser().subscribe(data=>{
      this.medecin=data;
      this.authService.getMembres(this.medecin.id).subscribe(data=>{
        this.patients=data;
      })
    })
  }

 /* getCapteursNoSelect() {
    this.id = this.route.snapshot.params["id"];
    this.authService.getDeviceCapteurs(this.id).subscribe(data => {
      console.log(data)
      this.capteursNoSelect = data
    })
  }*/

  update() {
    if (this.formDevice.valid){
      this.authService.updateDevice(this.formDevice.value).subscribe(data=>{
        this.router.navigateByUrl("/devices")
      })
    }
  }

}
