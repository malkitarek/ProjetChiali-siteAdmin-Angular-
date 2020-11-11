import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogSuppMembreComponent} from '../dialogs/dialog-supp-membre/dialog-supp-membre.component';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {

  searchText;
  membres;
  p;
  patient;
  medecin;
  idPat;
  idMed;

  constructor(private authSer:AuthService,private router:Router,public dialog: MatDialog) {

  }
  openDialog(idPat,idMed): void {
    this.idPat=idPat;
    this.idMed=idMed;
    const dialogRef = this.dialog.open(DialogSuppMembreComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1)
      this.delete();
    });

  }
  ngOnInit(): void {
    this.getMembres();
    //this.getMedecin();
  }

  getMembres(){
    this.authSer.getUser().subscribe(data=>{
      this.medecin=data;

      this.authSer.getMembres(this.medecin.id).subscribe(data=>{
        this.membres=data;
      },err=>{
        console.log(err);
      })
    },err=>{
      console.log(err)
    })

  }

  /*getMedecin(){
    this.authSer.getUser().subscribe(data=>{
      this.medecin=data
      console.log(this.medecin)
    },err=>{
      console.log(err)
    })
  }*/

  update(id) {
    this.router.navigateByUrl("/updatePatient/"+id)
  }

  smsMembre(idPat,idMed) {
    this.idPat=idPat;
    this.idMed=idMed;
    //this.router.navigateByUrl("/detailPatient/"+idPat);
  }

  delete() {
   this.authSer.supprimer(this.idPat,this.idMed).subscribe(data=>{
     this.getMembres()

   },err=>{
     console.log(err)
   })
  }


  smsMembreD(idPat,idMed) {
    this.idPat=idPat;
    this.idMed=idMed;
    this.router.navigateByUrl("/detailPatient/"+idPat);
  }
}

