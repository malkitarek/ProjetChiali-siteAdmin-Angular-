import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent implements OnInit{
   medecin;
   id;
  constructor(private authSer:AuthService,private route:ActivatedRoute,private router:Router) {


  }

  ngOnInit(){
    this.route.params.subscribe(({ id }) =>
      this.getMedecin(id)
    )
  }



  getMedecin(id){

    this.authSer.getMedecin(id).subscribe(data=>{
      this.medecin=data;

    })
  }
}
