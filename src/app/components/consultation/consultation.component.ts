import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogAddConsultationComponent} from '../dialogs/dialog-add-consultation/dialog-add-consultation.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogShowConsultationComponent} from '../dialogs/dialog-show-consultation/dialog-show-consultation.component';
import {DialogRapportComponent} from '../dialogs/dialog-rapport/dialog-rapport.component';
import {DialogOrdonnanceComponent} from '../dialogs/dialog-ordonnance/dialog-ordonnance.component';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  consultations;
  searchText;
  p;
  idPat;
  idMed;
  test = 0;


  constructor(private authServ: AuthService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.idPat = this.route.snapshot.queryParams['patient_id'];
    this.idMed = this.route.snapshot.queryParams['medecin_id'];
    this.getConsultations(this.idPat, this.idMed);

  }

  getConsultations(idPat, idMed) {
    this.authServ.getConsulations(idPat, idMed).subscribe(data => {
      this.consultations = data;
    })
  }

  voirCons(cons) {
    //console.log(cons)
    const dialogRef = this.dialog.open(DialogShowConsultationComponent, {
      width: '400px',
      data: {cons: cons}
    });
    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();
    })
  }

  voirRapport(cons) {
    const dialogRef = this.dialog.open(DialogRapportComponent, {
      width: '600px',
      data: {cons: cons}
    });
    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();
    })
  }

  voirOrdonnance(cons) {
    const dialogRef = this.dialog.open(DialogOrdonnanceComponent, {
      width: '600px',
      data: {cons: cons}
    });
    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();
    })
  }
}

