import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import {DialogSuppMembreComponent} from '../dialogs/dialog-supp-membre/dialog-supp-membre.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogSuppDeviceComponent} from '../dialogs/dialog-supp-device/dialog-supp-device.component';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {


  searchText;
  p;
  id;
  devices;
  patientId;
  constructor(private authService:AuthService,private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDevices();
  }

  openDialog(idev,idpat): void {
    this.id=idev;
    this.patientId=idpat;
    const dialogRef = this.dialog.open(DialogSuppDeviceComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1)
        this.delete();
    });

  }

  getDevices(){
    this.authService.getDevices().subscribe(data=>{
      this.devices=data;
    },err=>{
      console.log(err)
    })
  }

  update(id) {
     this.router.navigateByUrl("/updateDevice/"+id);
  }

  smsDevice(id) {
   this.id=id;
  }

  delete() {
   this.authService.deleteDevice(this.id,this.patientId).subscribe(data=>{
     this.getDevices();
   })
  }
}
