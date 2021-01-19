import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogAddErreurComponent} from '../dialogs/dialog-add-erreur/dialog-add-erreur.component';
import {DialogSuppPlombierComponent} from '../dialogs/dialog-supp-plombier/dialog-supp-plombier.component';

@Component({
  selector: 'app-erreur',
  templateUrl: './erreur.component.html',
  styleUrls: ['./erreur.component.css']
})
export class ErreurComponent implements OnInit {
  searchText;
  erreurs;
  p;

  constructor(private appService:AppService,private dialog:MatDialog) { }

  ngOnInit() {
    this.getErreurs();
  }
 getErreurs(){
    this.appService.getErreurs().subscribe(data=>{
      this.erreurs=data;
    },error => {
      console.log(error);
    })
 }

  openDialogAdd(id) {
    const dialogRef=this.dialog.open(DialogAddErreurComponent, {
      data: {id:id}
    });
    dialogRef.afterClosed().subscribe(data=>{
      this.getErreurs();
    })
  }

  openDialogDelete(id): void {

    const dialogRef = this.dialog.open(DialogSuppPlombierComponent, {
      data:{type:'erreurs'},
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1) {
        this.delete(id);
      }
    });

  }

  delete(id) {
    this.appService.deleteErreur(id).subscribe(data=>{
      this.getErreurs();
    },error => {
      console.log(error)
    })
  }
}
