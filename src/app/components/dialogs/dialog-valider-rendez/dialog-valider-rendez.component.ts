import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-valider-rendez',
  templateUrl: './dialog-valider-rendez.component.html',
  styleUrls: ['./dialog-valider-rendez.component.css']
})
export class DialogValiderRendezComponent implements OnInit {
  rendezV=1;
  constructor(public dialogRef: MatDialogRef<DialogValiderRendezComponent>,
              @Inject(MAT_DIALOG_DATA) public rendez) { }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }

}
