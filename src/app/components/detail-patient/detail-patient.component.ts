import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatDialog} from '@angular/material/dialog';
import {DialogAddConsultationComponent} from '../dialogs/dialog-add-consultation/dialog-add-consultation.component';
import {DialogSuppMembreComponent} from '../dialogs/dialog-supp-membre/dialog-supp-membre.component';
import {DialogSuppConsultationComponent} from '../dialogs/dialog-supp-consultation/dialog-supp-consultation.component';
import {DialogRapportComponent} from '../dialogs/dialog-rapport/dialog-rapport.component';
import {DialogOrdonnanceComponent} from '../dialogs/dialog-ordonnance/dialog-ordonnance.component';
@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit {
  patient;
  id;
  medecin;
  step = 0;
  medecinsTraitants;

  visible: boolean = true;
  searchText;
  consultations;
  p;
  idCons;
  consultation;
  step0 = 0;
  chanels;

  setStep(index: number) {
    this.step = index;

  }

  constructor(private authSer: AuthService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog) {


  }

  ngOnInit(): void {
    this.getChanels();

    this.id = this.route.snapshot.params['id'];

    this.authSer.getUser().subscribe(data => {
      this.medecin = data
      this.authSer.getMembre(this.id, this.medecin.id).subscribe(data => {
        this.patient = data;

        this.authSer.getConsulations(this.patient.id, this.medecin.id).subscribe(data => {
          this.consultations = data

        }, err => {
          console.log(err)
        })

      }, err => {
        console.log(err)
      })
    }, err => {
      console.log(err)
    })


    this.authSer.getMedecinsTraitants(this.id).subscribe(data => {

      this.medecinsTraitants = data;
    })



  }

  delete() {
    this.authSer.deleteCons(this.idCons).subscribe(data => {
      this.ngOnInit();
    });
  }

  getChanels() {
    this.id = this.route.snapshot.params['id'];
    this.authSer.getChanel(this.id).subscribe(data => {
      this.chanels = data;

    }, err => {
      console.log(err)
    })
  }


  ajouCons() {
    const dialogRef=this.dialog.open(DialogAddConsultationComponent, {
      data: {patient:this.patient,medecin:this.medecin}
    });
    dialogRef.afterClosed().subscribe(data=>{
      this.ngOnInit();
    })
  }

  editCons(cons: any) {
    const dialogRef=this.dialog.open(DialogAddConsultationComponent, {
      data: {patient:this.patient,medecin:this.medecin,cons:cons}
    });
    dialogRef.afterClosed().subscribe(data=>{
      this.ngOnInit();
    })
  }

  suppCons(idCons) {
    this.idCons = idCons;
    const dialogRef=this.dialog.open(DialogSuppConsultationComponent);
    dialogRef.afterClosed().subscribe(data=>{
      if(data==1)
      this.delete()
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




