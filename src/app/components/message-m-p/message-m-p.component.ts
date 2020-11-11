import {AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {AuthService} from '../../services/auth-service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WebSocketApiService} from '../../services/web-socket-api.service';
import {HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-message-m-p',
  templateUrl: './message-m-p.component.html',
  styleUrls: ['./message-m-p.component.scss']
})
export class MessageMPComponent implements OnInit,AfterViewChecked {
  @ViewChild('scroller') private messageContainer: ElementRef;
 contenu="";
  membres;
  membre;
  user;
  messages;
  height;
  role;
  idMembre;
  message;
  formMessage:FormGroup;
   messages2;
   messagesSocket;
  searchText;
   membresSocket;
  jwtToken;
  constructor(private authSer:AuthService,private route:ActivatedRoute,private router:Router,private formBuilder:FormBuilder
  ,private websocketapi:WebSocketApiService) {




  }

  ngOnInit(): void {
    this.authSer.getUser().subscribe(data=>{
      this.user=data;

    })
   this.idMembre=this.route.snapshot.params['id'];
  this.contenu="";
    this.height=window.innerHeight*65/100;

    /*$( '.friend-drawer--onhover' ).on( 'click',  function() {

      $( '.chat-bubble' ).hide('slow').show('slow');

    });*/
    this.pushMessageRealTime();
    this.getMessages();
    this.getMembres();



  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.height = window.innerHeight*65/100;

  }

  pushMessageRealTime(){
    let stompClient = this.websocketapi.connectMessage();

    stompClient.connect({}, frame => {

      // Subscribe to notification topic
      this.messagesSocket=stompClient.subscribe('/topic/messages', messages => {
        this.messagesSocket = JSON.parse(messages.body);
        // Update notifications attribute with the recent messsage sent from the server
        if(this.user.appUser.role=='MEDECIN'){
          if(this.messagesSocket[0].idPatient==this.route.snapshot.params['id']){this.messages = this.messagesSocket}
        }else {
          if(this.messagesSocket[0].idMedecin==this.route.snapshot.params['id']){this.messages = this.messagesSocket}
        }
      })

      this.membresSocket=stompClient.subscribe('/topic/msgsMembres', membres => {
       this.membresSocket= JSON.parse(membres.body);
        if(this.user.appUser.role=='MEDECIN'){
          if(this.membresSocket[0].idMedecin==this.user.id &&  this.membresSocket[0].fromQui=='PATIENT')this.membres=this.membresSocket;
          if(this.membresSocket[0].idMedecin==this.user.id &&  this.membresSocket[0].fromQui=='MEDECIN')this.ngOnInit()
        }
        else {
          if(this.membresSocket[0].idPatient==this.user.id &&  this.membresSocket[0].fromQui=='MEDECIN')this.membres=this.membresSocket;
          if(this.membresSocket[0].idPatient==this.user.id &&  this.membresSocket[0].fromQui=='PATIENT')this.ngOnInit()
        }

        for(let i=0;i<this.membres.length;i++){
          if(this.user.appUser.role=='MEDECIN'){
           if(this.membres[i].patient){ this.authSer.getUnreadMsg(this.user.id,this.membres[i].patient.id,this.user.appUser.role).subscribe(data=>{
             this.membres[i].h=data;
           })}
          }
          else{
            if(this.membres[i].medecin){
              this.authSer.getUnreadMsg(this.user.id,this.membres[i].medecin.id,this.user.appUser.role).subscribe(data=>{
                this.membres[i].h=data;
              })
            }

          }
        }
      });
    })
  }
  getMessages(){
    this.authSer.getUser().subscribe(data=>{
      this.user=data
      this.role=this.user.appUser.role;
      //console.log(this.medecin.appUser)
      this.idMembre=this.route.snapshot.params['id'];
      this.authSer.getMessages(this.user.id,this.idMembre,this.user.appUser.role).subscribe(data=>{
        this.messages=data;
      })
    })
  }
  getMembres(){
    this.authSer.getUser().subscribe(data=>{
      this.user=data;
      this.authSer.getMembresMsg(this.user.id,this.user.appUser.role).subscribe(data=>{
        this.membres=data;
        for(let i=0;i<this.membres.length;i++){
           if(this.user.appUser.role=='MEDECIN'){
             this.authSer.getUnreadMsg(this.user.id,this.membres[i].patient.id,this.user.appUser.role).subscribe(data=>{
               this.membres[i].h=data;
             })
           }
           else{
             this.authSer.getUnreadMsg(this.user.id,this.membres[i].medecin.id,this.user.appUser.role).subscribe(data=>{
               this.membres[i].h=data;
             })
           }
           }
        for(var i=0;i<this.membres.length;i++){
          if(this.user.appUser.role=='MEDECIN'){
            if(this.membres[i].patient.id==this.route.snapshot.params['id']){
              this.membre=this.membres[i];break;
            }
          }
          else{
            if(this.membres[i].medecin.id==this.route.snapshot.params['id']){
              this.membre=this.membres[i];break;
            }
          }

        }
      })


      })

  }

  scrollToBottom(): void {
    if(this.messageContainer){
      this.messageContainer.nativeElement.scrollTop
        = this.messageContainer.nativeElement.scrollHeight;
    }

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  onMessages(id) {
    this.router.navigateByUrl("/messages/"+id);
    this.ngOnInit();
  }

  onSendMessage(f) {

      this.authSer.sendMessage(f).subscribe(data=>{
        this.ngOnInit();
        // this.formMessage.get('contenu').setValue('');
      })


  }
}
