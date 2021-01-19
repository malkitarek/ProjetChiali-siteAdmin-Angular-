import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppService} from '../../../services/app.service';

@Component({
  selector: 'app-dialog-add-erreur',
  templateUrl: './dialog-add-erreur.component.html',
  styleUrls: ['./dialog-add-erreur.component.css']
})
export class DialogAddErreurComponent implements OnInit {
  formErreur: FormGroup;
  erreur;
  constructor(private formBuilder:FormBuilder, private dialogRef: MatDialogRef<DialogAddErreurComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,private appService:AppService) { }


  ngOnInit() {
    if(this.data.id==-1){
      this.formErreur=this.formBuilder.group({
        code:['',Validators.required],
        specification:['',Validators.required]
      })
    }else {
      this.appService.getErreur(this.data.id).subscribe(data=>{
        this.erreur=data;
        this.formErreur=this.formBuilder.group({
          code:[this.erreur?this.erreur.code:'',Validators.required],
          specification:[this.erreur?this.erreur.specification:'',Validators.required]
        })
      },error => {
        console.log(error);
      })
    }
  }

  onNoClick() {
    this.dialogRef.close();

  }

  onSubmit() {
  if(this.data.id==-1){
    this.appService.addErreur(this.formErreur.value).subscribe(data=>{
      this.dialogRef.close();
    },error => {
      console.log(error)
    });
  }else{
    this.appService.updateErreur(this.formErreur.value,this.data.id).subscribe(data=>{
      this.dialogRef.close();
    },error => {
      console.log(error)
    });
  }
  }
}
