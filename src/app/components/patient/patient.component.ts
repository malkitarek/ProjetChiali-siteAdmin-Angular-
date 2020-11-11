import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {DialogSuppMembreComponent} from '../dialogs/dialog-supp-membre/dialog-supp-membre.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogAffilMembreComponent} from '../dialogs/dialog-affil-membre/dialog-affil-membre.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  searchText;
  patients;
  p;
  patient;
  medecin;
  idMed;
  idPat;
  membres;
  donnes;
  message;
  constructor(private authSer:AuthService,private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    //this.getPtients();
    //this.getMedecin();

    if (this.authSer.getEmail()==null) {
      this.router.navigate(['login']);
    }

    this.authSer.getPatinets().subscribe(data=>{
      this.patients=data;

      this.authSer.getUser().subscribe(data=>{
        this.medecin=data;
        this.authSer.getMembres(this.medecin.id).subscribe(data=>{
          this.membres=data;

          for(var j=0;j<this.patients.length;j++){
            let y=0;
            for(var i=0;i<this.membres.length;i++){
              if(this.patients[j].id==this.membres[i].id){

                y=1
              }
            }
            let x;
            if(y==1)this.patients[j].x=1;
            else this.patients[j].x=0;

          }

        })

      },err=>{
        console.log(err)
      });
    },err=>{
      console.log(err);
    })


  }
  openDialog(idPat,idMed): void {
    this.idPat=idPat;
    this.idMed=idMed;
    const dialogRef = this.dialog.open(DialogAffilMembreComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1)
        this.affilier();
    });

  }
 /* getPtients(){
    this.authSer.getPatinets().subscribe(data=>{
      this.patients=data;
    },err=>{
      console.log(err);
    })
  }*/

 /* getMedecin(){
    this.authSer.getUser().subscribe(data=>{
      this.medecin=data
      console.log(this.medecin)
    },err=>{
      console.log(err)
    })
  }*/

  update(id) {

  }

  smsPatient(idPat,idMed) {
  this.idMed=idMed;
  this.idPat=idPat
  }

  affilier() {

    this.authSer.affilerPatient(this.idPat,this.idMed).subscribe(data=>{
     this.message={};
     this.message.idMedecin=this.idMed;
     this.message.idPatient=this.idPat;
     this.message.contenu='Je suis maitenant votre medecin traitant';
     this.message.fromQui='MEDECIN'
      this.authSer.sendMessage(this.message).subscribe(data=>{});
      this.router.navigateByUrl("/membres");
    },err=>{
      console.log(err)
    })
  }
}
