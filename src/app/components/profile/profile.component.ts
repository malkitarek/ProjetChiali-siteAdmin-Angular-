import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  membres;
  rendezVousMed;
  rendez;
  medecins;
  rendezVousPat;
  constructor(private authSer:AuthService) { }

  ngOnInit(): void {
    this.getUser();
    this.getMembres();
    this.getMedcintraitants();
    this.getRendezVousMed();
    this.getRendezVousPat();
  }

  getUser(){

    this.authSer.getUser().subscribe(data=>{
      this.user=data;
    })
  }

  getMembres(){
    this.authSer.getUser().subscribe(data=>{
      this.user=data;
      this.authSer.getMembres(this.user.id).subscribe(data=>{
        this.membres=data;
      })
    })
  }

getMedcintraitants(){
  this.authSer.getUser().subscribe(data=>{
    this.user=data;
    this.authSer.getMedecinsTraitants(this.user.id).subscribe(data=>{
      this.medecins=data;
    })
  })
}

  getRendezVousMed(){
    this.authSer.getUser().subscribe(data=>{
      this.user=data;
      this.authSer.getRendezVousMedLast(this.user.id).subscribe(data=>{

         this.rendezVousMed=data;

      })
    })
  }

  getRendezVousPat(){
    this.authSer.getUser().subscribe(data=>{
      this.user=data;
      this.authSer.getRendezVousP(this.user.id).subscribe(data=>{

        this.rendezVousPat=data;

      })
    })
  }
}
