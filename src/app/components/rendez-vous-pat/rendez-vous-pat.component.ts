import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogAffilMembreComponent} from '../dialogs/dialog-affil-membre/dialog-affil-membre.component';
import {DialogValiderRendezComponent} from '../dialogs/dialog-valider-rendez/dialog-valider-rendez.component';

@Component({
  selector: 'app-rendez-vous-pat',
  templateUrl: './rendez-vous-pat.component.html',
  styleUrls: ['./rendez-vous-pat.component.css']
})
export class RendezVousPatComponent implements OnInit {
  searchText;
  rendezvous;
  p;
  patient;

  constructor(private authSer:AuthService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRendezvous()
  }

  getRendezvous(){
    this.authSer.getUser().subscribe(data=>{
      this.patient=data;
      this.authSer.getRendezVousP(this.patient.id).subscribe(data=>{
        this.rendezvous=data;
      })
    });
  }

  openDialog(idRendez): void {

    const dialogRef = this.dialog.open(DialogValiderRendezComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result==1)
        this.valider(idRendez);
    });

  }

   valider(idRendez) {
    this.authSer.validerRendez(idRendez).subscribe(data=>{
      this.ngOnInit();
    })
  }
}
