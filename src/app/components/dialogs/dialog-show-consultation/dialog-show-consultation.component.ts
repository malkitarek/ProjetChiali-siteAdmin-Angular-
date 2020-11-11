import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-show-consultation',
  templateUrl: './dialog-show-consultation.component.html',
  styleUrls: ['./dialog-show-consultation.component.css']
})
export class DialogShowConsultationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogShowConsultationComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

}
