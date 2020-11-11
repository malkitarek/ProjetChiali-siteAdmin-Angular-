import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth-service/auth.service';
import * as $ from 'jquery';
import {
  ActivatedRoute, NavigationEnd,
  NavigationStart,
  Router,
  RouterLink, RouterLinkActive,
  RouterState,
  RouterStateSnapshot,
  Routes
} from '@angular/router';
import {WebSocketApiService} from './services/web-socket-api.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'front-user';
  public showHead = false;
  public showLogin = false;
  public showRegister = false;
  public showForget = false;
  public showConfirm = false;
  public id;
  public user;
  public Waves: any;
  public showHead2: boolean;
  public services;
  public messagesError;

  isMenuOpen = true;
  contentMargin = 240;

  task: string[] = [
    'Clearning out my closet', 'Take out trash bins', 'Wash car', 'Tank up the motorcycles', 'Go for flight training'
  ]
   mesgNoReaded;
   messagesSocket;
   medecins;
   notifications;
   notifsNoread;
  notifsSocket;

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }
  constructor(private router: Router,public authSer:AuthService,private route:ActivatedRoute,private websocketapi:WebSocketApiService){

    // on route change to '/login', set the variable showHead to false
   router.events.forEach((event) => {
      if (event instanceof NavigationStart ) {

        if (event['url'] == '/login') {
          this.showHead = false;
          this.showHead2=false
          this.showRegister =false;
          this.showForget = false;
          this.showConfirm = false;
          this.showLogin=true
        } else if (event['url'] == '/register') {
          this.showHead = false;
          this.showHead2=true
          this.showLogin =false;
          this.showForget = false;
          this.showConfirm = false;
          this.showRegister=true
        } else if (event['url'] == '/forgetMdp') {
          this.showHead = false;
          this.showHead2=true
          this.showRegister =false;
          this.showLogin = false;
          this.showConfirm = false;
          this.showForget = true;
        } else if (event['url'].split("/")[1] == 'confirme') {
          this.showHead = false;
          this.showHead2=true
          this.showRegister =false;
          this.showLogin = false;
          this.showForget = false;
          this.showConfirm=true;
        }
        else  {
          // console.log("NU")
          this.showHead = true;

        }
      }
    });
  }


  getUser(){
    this.authSer.getUser().subscribe(data=>{
      this.user=data;
    },err=>{
      this.messagesError=err.error.message
      if(this.messagesError="Medecin n'est plus exister"){
        this.authSer.logout();
        this.router.navigateByUrl("/login")
      }
    })
  }

  getMedecinsTraitants(){
    this.authSer.getUser().subscribe(data=>{
      this.user=data;
      if(this.user.appUser.role=="PATIENT"){
        this.authSer.getMedecinsTraitants(this.user.id).subscribe(data=>{
          this.medecins=data;
          this.authSer.getServices().subscribe(data=>{
              this.services=data;
          for(let i=0;i<this.services.length;i++){
            let x=0;
            this.services[i].medt=[]
            for(let j=0;j<this.medecins.length;j++){
              if(this.medecins[j].service.nom==this.services[i].nom){
                this.services[i].medt.push(this.medecins[j]);
                x=x+1
              }
            }
          }
          })
        })
      }
    })
  }

  onLogout() {
    this.authSer.logout();
    this.router.navigateByUrl("login").then(() => {
      window.location.reload();
    });
  }
  onChange(username) {
    this.router.navigateByUrl("/changeMdp/"+username);
  }

  ngOnInit() {


    if (this.authSer.getEmail()==null) {
      this.showHead2=false
    }else {
      this.showHead2=true
      this.getNotification();
      this.getAllMessageNoReader();
      this.pushMessageRealTime();
      this.getMedecinsTraitants();
     }



    if(this.authSer.getEmail()!=null) {
      this.getUser();
    }

  }


  onMessage() {
    this.authSer.getUser().subscribe(data=>{
      this.user=data;
      this.authSer.getUserLastMsg(this.user.id,this.user.appUser.role).subscribe(data=>{
        this.router.navigateByUrl("/messages/"+data);

      })

    })

  }

  getAllMessageNoReader(){
    this.authSer.getUser().subscribe(data=>{
      this.user=data;
    this.authSer.getAllMessageNoReader(this.user.id,this.user.appUser.role).subscribe(data=>{
      this.mesgNoReaded=data;

    });
    })
  }

  pushMessageRealTime(){
    let stompClient = this.websocketapi.connectMessage();
    stompClient.connect({}, frame => {

      // Subscribe to notification topic
      this.messagesSocket=stompClient.subscribe('/topic/allMessages', messages => {
        this.messagesSocket= JSON.parse(messages.body);
       if(this.user.appUser.role=='MEDECIN'){
         if(this.messagesSocket[0].fromQui=='PATIENT' && this.messagesSocket[0].idMedecin==this.user.id) this.mesgNoReaded=this.messagesSocket.length;
         if(this.messagesSocket[0].fromQui=='TAREK' && this.messagesSocket[0].idMedecin==this.user.id) this.mesgNoReaded=0
       }
        else{
         if(this.messagesSocket[0].fromQui=='MEDECIN' && this.messagesSocket[0].idPatient==this.user.id)this.mesgNoReaded=this.messagesSocket.length;
         if(this.messagesSocket[0].fromQui=='TAREK' && this.messagesSocket[0].idPatient==this.user.id) this.mesgNoReaded=0
        }
        // Update notifications attribute with the recent messsage sent from the server
      })
      this.notifsSocket=stompClient.subscribe('/topic/notifications', notifications => {
        this.notifsSocket= JSON.parse(notifications.body);
        if(this.user.appUser.role=="PATIENT"){
          if(this.notifsSocket[0].idPatient==this.user.id && this.notifsSocket[0].fromQui=="MEDECIN")this.notifications=this.notifsSocket;

        }

        else {
          if(this.notifsSocket[0].idMedecin==this.user.id && this.notifsSocket[0].fromQui=="PATIENT")this.notifications=this.notifsSocket;
        }
        let y=0;
        for(let i=0;i<this.notifications.length;i++){
          if (this.notifications[i].readed==null)y=y+1
        }
        this.notifsNoread=y;
      })

    })
  }

  getNotification(){
    this.authSer.getUser().subscribe(data=>{
      this.user=data;
      this.authSer.getNotifications(this.user.id,this.user.appUser.role).subscribe(data=>{
        this.notifications=data;

        let y=0;
        for(let i=0;i<this.notifications.length;i++){
          if (this.notifications[i].readed==null)y=y+1
        }
        this.notifsNoread=y;

      })
    })
  }

  onNotif(type) {
    if(type=='rendezVous'){
      this.router.navigateByUrl("/rendezvousp").then(() => {
        window.location.reload();
      });
    }
    if(type=='rendezVousValidation'){
      this.router.navigateByUrl("/rendezvous").then(() => {
        window.location.reload();
      });
    }
  }
}
