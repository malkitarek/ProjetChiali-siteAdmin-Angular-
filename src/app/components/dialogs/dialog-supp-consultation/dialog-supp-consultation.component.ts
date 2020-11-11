import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-supp-consultation',
  templateUrl: './dialog-supp-consultation.component.html',
  styleUrls: ['./dialog-supp-consultation.component.css']
})
export class DialogSuppConsultationComponent implements OnInit {
 supp=1
  constructor(public dialogRef: MatDialogRef<DialogSuppConsultationComponent>,
              @Inject(MAT_DIALOG_DATA) public sup) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
