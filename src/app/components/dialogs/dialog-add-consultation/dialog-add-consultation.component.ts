import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-dialog-add-consultation',
  templateUrl: './dialog-add-consultation.component.html',
  styleUrls: ['./dialog-add-consultation.component.css']
})
export class DialogAddConsultationComponent implements OnInit {
  formConsulation: FormGroup;
  //chips
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  constructor(private formBuilder:FormBuilder, private dialogRef: MatDialogRef<DialogAddConsultationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,private authSer:AuthService) { }

  ngOnInit(): void {
    //console.log(this.data.cons.nom)
    this.formConsulation=this.formBuilder.group({
      idCons:[this.data.cons?this.data.cons.id:''],
      nomTraitement:[this.data.cons?this.data.cons.traitement.nom:'',Validators.required],
      traitements:this.formBuilder.array(this.data.cons?this.data.cons.traitement.contenu:[]),
      rapporte:[this.data.cons?this.data.cons.rapporte:'',Validators.required],
      medecin:[this.data.medecin,Validators.required],
      patient:[this.data.patient,Validators.required]
    })
  }
  onSubmit() {

      this.authSer.saveConsulation(this.formConsulation.value).subscribe(data => {
        this.dialogRef.close();
      })

  }
  getTraitements(){
    return this.formConsulation.get('traitements') as FormArray
  }
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our requirement
    if ((value || '').trim()) {
      const antecedentsFamiliaux = this.formConsulation.get('traitements') as FormArray;
      antecedentsFamiliaux.push(this.formBuilder.control(value.trim()));
    }
    if (input) {
      input.value = '';
    }
  }

  remove(index: number): void {
    const antecedentsFamiliaux = this.formConsulation.get('traitements') as FormArray;

    if (index >= 0) {
      antecedentsFamiliaux.removeAt(index);
    }
  }

  onNoClick() {
    this.dialogRef.close();

  }
}
