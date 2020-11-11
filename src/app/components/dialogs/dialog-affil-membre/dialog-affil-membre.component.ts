import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-affil-membre',
  templateUrl: './dialog-affil-membre.component.html',
  styleUrls: ['./dialog-affil-membre.component.css']
})
export class DialogAffilMembreComponent implements OnInit {
  affil=1;

  constructor(public dialogRef: MatDialogRef<DialogAffilMembreComponent>,
              @Inject(MAT_DIALOG_DATA) public affi) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
