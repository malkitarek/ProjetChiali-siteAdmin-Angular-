import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MapsAPILoader, MouseEvent} from '@agm/core';

@Component({
  selector: 'app-update-plombier',
  templateUrl: './update-plombier.component.html',
  styleUrls: ['./update-plombier.component.css']
})
export class UpdatePlombierComponent implements OnInit {
  formPlombier: FormGroup;
  formCompte: FormGroup;
  id;
  plombier;
  villes;
  hide: boolean=true;
  latitude: number;
  longitude: number;
  zoom: number;
  constructor(private appService:AppService,private router:Router,private route:ActivatedRoute,private formBuilder:FormBuilder,private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.getVilles();

    this.id=this.route.snapshot.params['id'];
    this.appService.getPlombier(this.id).subscribe(data=>{
      this.plombier=data;
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation(this.plombier.localisation.latitude,this.plombier.localisation.longitude);
      });
      this.formPlombier=this.formBuilder.group({
        nom:[this.plombier?this.plombier.nom:'',Validators.required],
        prenom:[this.plombier?this.plombier.prenom:'',Validators.required],
        phone:[this.plombier?this.plombier.compte.phone:'',Validators.required],
        nomVille:[this.plombier?this.plombier.ville.nom:'',Validators.required],
        latitude:[this.plombier?this.plombier.localisation.latitude:''],
        longitude:[this.plombier?this.plombier.localisation.longitude:'']
      });
      this.formCompte=this.formBuilder.group({
        username:[this.plombier?this.plombier.compte.username:'',Validators.required],
        password:[this.plombier?this.plombier.compte.passwordVue:'',Validators.required]
      });
    },error => {
      console.log(error);
    });
  }
  getVilles(){
    this.appService.getVilles().subscribe(data=>{
      this.villes=data;
    },error => {
      console.log(error);
    })
  }

  update() {
   this.appService.updatePlombier({...this.formPlombier.value,...this.formCompte.value},this.id,this.plombier.compte.id,this.plombier.localisation.id).subscribe(data=>{
      this.router.navigateByUrl("/plombiers");
    },error => {
      console.log(error)
    })
  }
  setCurrentLocation(latitude,longitude) {
    /*if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = latitude;
        this.formPlombier.get('latitude').setValue( this.latitude);
        this.longitude = longitude;
        this.formPlombier.get('longitude').setValue( this.longitude);
        this.zoom = 8;
      });
    }*/
    this.latitude = latitude;
    this.formPlombier.get('latitude').setValue( this.latitude);
    this.longitude = longitude;
    this.formPlombier.get('longitude').setValue( this.longitude);
    this.zoom = 8;
  }
  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.formPlombier.get('latitude').setValue( this.latitude);
    this.longitude = $event.coords.lng;
    this.formPlombier.get('longitude').setValue( this.longitude);
  }
}
