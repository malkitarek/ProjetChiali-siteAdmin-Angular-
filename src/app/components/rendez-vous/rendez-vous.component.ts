import {Component, OnInit, ViewChild,ViewEncapsulation} from '@angular/core';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import {
  WorkHoursModel,
  DayService,
  WeekService,
  WorkWeekService,
  CurrentAction,
  MonthService,
  PopupOpenEventArgs,
  EJ2Instance, ScheduleComponent
} from '@syncfusion/ej2-angular-schedule';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rendez-vous',
  providers: [DayService, WeekService, WorkWeekService, MonthService],
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  medecin;
  rendez;
  rendezVous={
    dataSource: null,
   fields:null
  };
  membres;
  public weekFirstDay: number = 7;
  public selectedDate: Date = new Date();
  public workHours: WorkHoursModel = { start: '08:00', end: '18:00' };
  public views: Array<string> = ['Day', 'Week'];
  private selectionTarget: Element;
  public showQuickInfo: Boolean = false;
  public eventSettings = {
    dataSource:null,
    fields: {
      id: 'id',
      subject: { name: 'titre', title: 'Event Name' ,validation: { required: true }},
      startTime: { name: 'dateDebut', title: 'Start Duration' ,validation: { required: true }},
      endTime: { name: 'dateFin', title: 'End Duration' ,validation: { required: true } },
      description: { name: 'description', title: 'Event Description' },
    }
  };

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      if (!isNullOrUndefined(document.getElementById("EventType_Error"))) {
        document.getElementById("EventType_Error").style.display = "none";
        document.getElementById("EventType_Error").style.left = "351px";
      }
      let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
      let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
      if (!statusElement.classList.contains('e-dropdownlist')) {
        let dropDownListObject: DropDownList = new DropDownList({
          dataSource: this.membres,
          fields: { text: 'nom', value: 'id' },
          value: (<{ [key: string]: Object }>(args.data)).idPatient as string,
          floatLabelType: 'Always', placeholder: 'patient',

          select: function(args) {
            if (!isNullOrUndefined(document.getElementById("EventType_Error"))) {
              document.getElementById("EventType_Error").style.display = "none";
            }
          }
        });
        dropDownListObject.appendTo(statusElement);
        statusElement.setAttribute('name', 'idPatient');
      }
      let validator: FormValidator = ((formElement as EJ2Instance).ej2_instances[0] as FormValidator);
      validator.addRules('idPatient', { required: true });
      let debutElement: HTMLInputElement = args.element.querySelector('#dateDebut') as HTMLInputElement;
      if (!debutElement.classList.contains('e-datetimepicker')) {
        new DateTimePicker({ value: new Date(debutElement.value) || new Date() }, debutElement);
      }
      let endElement: HTMLInputElement = args.element.querySelector('#dateFin') as HTMLInputElement;
      if (!endElement.classList.contains('e-datetimepicker')) {
         new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
          }





    }
  }




  constructor(private authSer:AuthService,private router:Router) { }

  ngOnInit(): void {

    this.getMembres();
    this.getRendezVous();

  }



   getRendezVous(){

    this.authSer.getUser().subscribe(data=>{
      this.medecin=data;
     this.authSer.getRendezVous(this.medecin.id).subscribe(data=>{
    console.log(data)
      this.rendezVous.dataSource=data;
       this.rendezVous.fields= {
         id: 'id',
         subject: { name: 'titre', title: 'Event Name' ,validation: { required: true }},
         startTime: { name: 'dateDebut', title: 'Start Duration' ,validation: { required: true }},
         endTime: { name: 'dateFin', title: 'End Duration'  ,validation: { required: true }},
         description: { name: 'description', title: 'Event Description' },

       };
       this.eventSettings=this.rendezVous;
       //this.scheduleObj.eventSettings=this.rendezVous;
     })
    })
  }
  getMembres(){
    this.authSer.getUser().subscribe(data=>{
      this.medecin=data;
      this.authSer.getMembres(this.medecin.id).subscribe(data=>{
        this.membres=data;
      })
      })
  }

  onClick(e) {
   console.log(e)
    if(e.requestType=="eventCreate"){

      if (e.data[0].dateFin.getTime() < e.data[0].dateDebut.getTime()) {
        console.log("ttttttttttttttttttt")
        alert("End time must be greater than Start time ");
      }
      else{
        this.authSer.saveRendezVous(e.data[0]).subscribe(data=>{
          window.location.reload();

        })

      }

    }
   else if(e.requestType=="eventRemove"){
     this.authSer.deleteRendez(e.data[0].id).subscribe(data=>{
     })

    }
    else if(e.requestType=="eventChange"){
      this.authSer.updateRendez(e.data).subscribe(data=>{
      })
    }
  }
}
