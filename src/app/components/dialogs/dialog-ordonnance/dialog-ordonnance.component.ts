import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ordonnance',
  templateUrl: './dialog-ordonnance.component.html',
  styleUrls: ['./dialog-ordonnance.component.css']
})
export class DialogOrdonnanceComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogOrdonnanceComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
