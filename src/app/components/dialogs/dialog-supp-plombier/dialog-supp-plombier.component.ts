import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-supp-plombier',
  templateUrl: './dialog-supp-plombier.component.html',
  styleUrls: ['./dialog-supp-plombier.component.css']
})
export class DialogSuppPlombierComponent implements OnInit {


  supp=1;

  constructor(
    public dialogRef: MatDialogRef<DialogSuppPlombierComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();

  }

}
