import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {DialogSuppPlombierComponent} from '../dialogs/dialog-supp-plombier/dialog-supp-plombier.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-plombier',
  templateUrl: './plombier.component.html',
  styleUrls: ['./plombier.component.css']
})
export class PlombierComponent implements OnInit {
  public plombiers;
  searchText;
  p;
  id;

  constructor(private appService:AppService,private router:Router,public dialog: MatDialog) { }

  ngOnInit() {
    this.getPlombiers();
  }

  getPlombiers(){
    this.appService.getPlombiers().subscribe(data=>{
      this.plombiers=data;
    },error => {
      console.log(error);
    });
  }

  update(id) {
   this.router.navigateByUrl('/updatePlombier/'+id);
  }

  openDialog(id): void {
    this.id=id;
    const dialogRef = this.dialog.open(DialogSuppPlombierComponent, {
      data:{type:'plombiers'},
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1) {
        this.delete(this.id);
      }
    });

  }

   delete(id) {
     this.appService.deletePlombier(id).subscribe(data=>{
       this.getPlombiers();
     },error => {
       console.log(error)
     })
  }
}
