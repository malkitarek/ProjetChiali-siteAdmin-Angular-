import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Chart } from 'chart.js';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {DatePipe, formatDate} from '@angular/common';
import {WebSocketApiService} from '../../services/web-socket-api.service';

@Component({
  selector: 'app-detail-chanel',
  templateUrl: './detail-chanel.component.html',
  styleUrls: ['./detail-chanel.component.css']
})
export class DetailChanelComponent implements OnInit {
   patient;
  donneesSocket;
  idPat;
  idChanel;
  nomFeild;
  donnees;
  p :number;
  pEcg :number;
  date=new Date();

  valeurs=[];
  dates =[] ;
  dateVal:string;
  heure:string=formatDate(this.date,'HH','en-US');
  dateCalen:string=formatDate(this.date,'yyyy-MM-dd','en-US');
  dateActive;
  public Options = {
    legend: {
      display: true,
    },
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'series',
        time: {
          unit: 'minute',
          /*displayFormats: {
            quarter: 'h:mm:ss.SSS a'
          }*/
        },
        display: true,
      }],
      yAxes: [{
        display: true,
        id: 'y-axis-1',
        ticks: {min: 0}
      }],
    }

    }
  public Options2 = {
    legend: {
      display: true,
    },
    scales: {
      yAxes: [{
        display: true
      }],
    }}

  public Labels = [];
  public Type = 'line';

  public Data = [
    {data: [], label: null},
  ];
  public Data2 = [
    {data: [], label: null},
  ];
  public Data3 = [
    {data: [], label: null},
  ];
  step0=0;
  lastDonnes;
  feilds;



  constructor(private authServ:AuthService,private router:Router,private route:ActivatedRoute,private websocketapi:WebSocketApiService) {

  }

  ngOnInit(): void {
   this.getLastMesure();
   this.getFeilds();
    this.valeurs=[];
    this.dates=[];
    this.getPatient();
   this.getDonnees();
   this.getDonneesRealTime();


}
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

    this.dateCalen=formatDate(event.value,'yyyy-MM-dd','en-US');
    this.ngOnInit()
  }
  onProg(heure) {
   this.heure=heure;
   this.ngOnInit()
  }
  getLastMesure(){
    this.idPat=this.route.snapshot.queryParams['patient_id'];
    this.idChanel=this.route.snapshot.queryParams['chanel_id'];
    this.nomFeild=this.route.snapshot.queryParams['feild_nom'];
    this.authServ.getLastMesure(this.idPat,this.idChanel,this.nomFeild).subscribe(data=>{
    this.lastDonnes=data;
    })
  }

  getDate(date) {
    this.dateCalen=formatDate(date,'yyyy-MM-dd','en-US');
    this.heure=formatDate(date,'H','en-US');
    //this.date=formatDate(date,'yyyy-MM-dd','en-US');
    this.dateActive=date;
    this.ngOnInit()
  }

  getFeilds(){
    this.idPat=this.route.snapshot.queryParams['patient_id'];
    this.idChanel=this.route.snapshot.queryParams['chanel_id'];
    this.authServ.getFeilds( this.idPat,this.idChanel).subscribe(data=>{
      this.feilds=data;
    })
  }

  getChanel(nomFeild) {
    this.idPat=this.route.snapshot.queryParams['patient_id'];
    this.idChanel=this.route.snapshot.queryParams['chanel_id'];
    this.router.navigate(['/detailChanel'], { queryParams: { patient_id: this.idPat,chanel_id:this.idChanel,feild_nom:nomFeild} }).then(
      ()=>{window.location.reload();}
    );
   //this.ngOnInit();
  }

  getPatient(){
    this.authServ.getPatient(this.route.snapshot.queryParams['patient_id']).subscribe(data=>{
      this.patient=data;
    })
  }

  getDonnees(){

    this.idPat=this.route.snapshot.queryParams['patient_id'];
    this.idChanel=this.route.snapshot.queryParams['chanel_id'];
    this.nomFeild=this.route.snapshot.queryParams['feild_nom'];
    this.authServ.getDonnees(this.idPat,this.idChanel,this.nomFeild).subscribe(data=>{
      this.donnees=data;
      this.Data3[0].label=this.donnees[0].feild.nom
      this.Data2=this.Data3;
      for(var i=0;i<this.donnees.length;i++){
        this.dateVal=this.donnees[i].time;

        if(this.dateVal.split("T")[0]===this.dateCalen){
          if( String(Number(this.dateVal.split("T")[1].split(":")[0])+1)===this.heure){
            this.valeurs.push(this.donnees[i].valeur);
            if(this.nomFeild=='ECG wave'){
              this.dates.push(i)
            }
            else{this.dates.push(this.donnees[i].time)}
          }

        }

      }


      this.Data[0].data=this.valeurs;
      this.Labels=this.dates;
      this.p=this.Labels.length/5;
      if((this.Labels.length/5) > Number(this.p.toFixed(0))){
        this.p= Number(this.p.toFixed(0))+1
      }
      else{this.p=Number(this.p.toFixed(0))}

      this.pEcg=this.Labels.length/50;
      if((this.Labels.length/50) > Number(this.pEcg.toFixed(0))){
        this.pEcg= Number(this.pEcg.toFixed(0))+1
      }
      else{this.pEcg=Number(this.pEcg.toFixed(0))}

    });
  }

  getDonneesRealTime(){

    let stompClient = this.websocketapi.connect();
    stompClient.connect({}, frame => {

      // Subscribe to notification topic
      this.donneesSocket=stompClient.subscribe('/topic/donnees', donnes => {

        // Update notifications attribute with the recent messsage sent from the server
        this.donneesSocket = JSON.parse(donnes.body);

        if (this.donneesSocket.feild.chanel.patientId==this.idPat && this.donneesSocket.feild.nom==this.nomFeild) {
          this.donnees=this.donneesSocket;

          this.dateVal=this.donnees.time;
          if(this.dateVal.split("T")[0]===this.dateCalen){
            if( String(Number(this.dateVal.split("T")[1].split(":")[0])+1)===this.heure){

              this.Data[0].data.push(this.donnees.valeur)
              //this.Data2[0].label=this.donnees[0].feild.nom
              this.Labels.push(this.donnees.time)

              this.p=this.Labels.length/5;
              if((this.Labels.length/5) > Number(this.p.toFixed(0))){
                this.p= Number(this.p.toFixed(0))+1
              }
              else{this.p=Number(this.p.toFixed(0))}

              this.pEcg=this.Labels.length/50;
              if((this.Labels.length/50) > Number(this.pEcg.toFixed(0))){
                this.pEcg= Number(this.pEcg.toFixed(0))+1
              }
              else{this.pEcg=Number(this.pEcg.toFixed(0))}

            }}
        }
      })
    });

  }

}


