import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {AppService} from './services/app.service';
import {Router} from '@angular/router';
import {MapsAPILoader,MouseEvent} from '@agm/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isMenuOpen = true;
  contentMargin = 240;
  connecter;
  user;



  @ViewChild('search')
  public searchElementRef: ElementRef;
 constructor(private appService:AppService,private router:Router){}

  ngOnInit(): void {
    this.connecter=this.appService.getUsername();
    console.log(this.connecter)
    if(this.connecter != null){
      this.appService.getUser().subscribe(data=>{
        this.user=data;
      })
    }

  }


  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }


  onLogout() {
    this.appService.logout();
    window.location.reload();
  }
}
