import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-rapport',
  templateUrl: './dialog-rapport.component.html',
  styleUrls: ['./dialog-rapport.component.css']
})
export class DialogRapportComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogRapportComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
