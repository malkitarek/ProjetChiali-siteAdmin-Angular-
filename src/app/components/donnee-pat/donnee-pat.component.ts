import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-donnee-pat',
  templateUrl: './donnee-pat.component.html',
  styleUrls: ['./donnee-pat.component.css']
})
export class DonneePatComponent implements OnInit {
  chanels;
  id;
  user;

  constructor(private authSer:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.getChanels();
  }

  getChanels(){
    this.authSer.getUser().subscribe(data=>{
      this.user=data;
      this.id=this.user.id
      this.authSer.getChanel(this.id).subscribe(data => {
        this.chanels = data;

      }, err => {
        console.log(err)
      })
    })
  }

  getChanelPat(idPat, idChanle, nomCapt) {
    if(nomCapt=="temprature"){
      this.router.navigate(['/detailChanel'], { queryParams: { patient_id: idPat,chanel_id:idChanle,feild_nom:'temp'} });
    }
    else if(nomCapt=="ECG"){
      this.router.navigate(['/detailChanel'], { queryParams: { patient_id: idPat,chanel_id:idChanle,feild_nom:'ECG wave'} });
    }
    else if(nomCapt=="Blood Pressure"){
      this.router.navigate(['/detailChanel'], { queryParams: { patient_id: idPat,chanel_id:idChanle,feild_nom:'diastolic'} });
    }

    else if(nomCapt=="Spo2"){
      this.router.navigate(['/detailChanel'], { queryParams: { patient_id: idPat,chanel_id:idChanle,feild_nom:'spo2'} });
    }
  }
}
