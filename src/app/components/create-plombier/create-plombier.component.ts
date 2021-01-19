import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {MapsAPILoader, MouseEvent} from '@agm/core';

@Component({
  selector: 'app-create-plombier',
  templateUrl: './create-plombier.component.html',
  styleUrls: ['./create-plombier.component.css']
})
export class CreatePlombierComponent implements OnInit {
  formPlombier: FormGroup;
  formCompte: FormGroup;
  villes;
  hide = true;
  latitude: number;
  longitude: number;
  zoom: number;
  constructor(private appService:AppService, private formBuilder:FormBuilder,private router:Router,private mapsAPILoader: MapsAPILoader) { }

  ngOnInit(): void {
    this.getVilles();
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
    });
    this.formPlombier=this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      phone:['',Validators.required],
      nomVille:['',Validators.required],
      latitude:[this.latitude],
      longitude:[this.longitude],
    });
    this.formCompte=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });


  }

  save() {
    console.log(this.formPlombier.value);
    this.appService.addPlombier({...this.formPlombier.value,...this.formCompte.value}).subscribe(data=>{
      this.router.navigateByUrl('/plombiers');
    },error => {
      console.log(error)
    })
  }

  getVilles(){
    this.appService.getVilles().subscribe(data=>{
      this.villes=data;
    },error => {
      console.log(error);
    })
  }
   setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.formPlombier.get('latitude').setValue( this.latitude);
        this.longitude = position.coords.longitude;
        this.formPlombier.get('longitude').setValue( this.longitude);
        this.zoom = 7;
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.formPlombier.get('latitude').setValue( this.latitude);
    this.longitude = $event.coords.lng;
    this.formPlombier.get('longitude').setValue( this.longitude);
  }
}
