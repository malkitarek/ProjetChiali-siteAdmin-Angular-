import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-supp-membre',
  templateUrl: './dialog-supp-membre.component.html',
  styleUrls: ['./dialog-supp-membre.component.css']
})
export class DialogSuppMembreComponent implements OnInit {
  supp=1;

  constructor(
    public dialogRef: MatDialogRef<DialogSuppMembreComponent>,
    @Inject(MAT_DIALOG_DATA) public sup) {}

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();

  }
}
