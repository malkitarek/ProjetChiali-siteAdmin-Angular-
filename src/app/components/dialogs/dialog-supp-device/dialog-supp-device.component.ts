import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-supp-device',
  templateUrl: './dialog-supp-device.component.html',
  styleUrls: ['./dialog-supp-device.component.css']
})
export class DialogSuppDeviceComponent implements OnInit {

  supp=1
  constructor(public dialogRef: MatDialogRef<DialogSuppDeviceComponent>,
              @Inject(MAT_DIALOG_DATA) public sup) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
