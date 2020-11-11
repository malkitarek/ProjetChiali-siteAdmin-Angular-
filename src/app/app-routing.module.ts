import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {PatientComponent} from './components/patient/patient.component';
import {ConfirmeComponent} from './components/confirme/confirme.component';
import {RegisterComponent} from './components/register/register.component';
import {ForgetMdpComponent} from './components/forget-mdp/forget-mdp.component';
import {GaurdService} from './services/auth-gaurd/gaurd.service';
import {GaurdInverseService} from './services/auth-gaurd/gaurd-inverse.service';
import {AppComponent} from './app.component';
import {MembreComponent} from './components/membre/membre.component';
import {CreatePatientComponent} from './components/create-patient/create-patient.component';
import {UpdatePatientComponent} from './components/update-patient/update-patient.component';
import {DetailPatientComponent} from './components/detail-patient/detail-patient.component';
import {DeviceComponent} from './components/device/device.component';
import {CreateDeviceComponent} from './components/create-device/create-device.component';
import {UpdateDeviceComponent} from './components/update-device/update-device.component';
import {DetailChanelComponent} from './components/detail-chanel/detail-chanel.component';
import {MessageMPComponent} from './components/message-m-p/message-m-p.component';
import {RendezVousComponent} from './components/rendez-vous/rendez-vous.component';
import {GaurdMService} from './services/auth-gaurd/gaurd-m.service';
import {GaurdPService} from './services/auth-gaurd/gaurd-p.service';
import {RendezVousPatComponent} from './components/rendez-vous-pat/rendez-vous-pat.component';
import {DonneePatComponent} from './components/donnee-pat/donnee-pat.component';
import {MedecinComponent} from './components/medecin/medecin.component';
import {ProfileComponent} from './components/profile/profile.component';
import {EditProfileMedComponent} from './components/edit-profile-med/edit-profile-med.component';
import {EditProfilePatComponent} from './components/edit-profile-pat/edit-profile-pat.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {ConsultationComponent} from './components/consultation/consultation.component';


const routes: Routes = [
  //{path:'',component:AppComponent,canActivate:[GaurdService]},
  {path:'',redirectTo:'patients',pathMatch:"full",canActivate:[GaurdService]},

  {path:'login',component:LoginComponent,canActivate:[GaurdInverseService]},
  {path:'register',component:RegisterComponent,canActivate:[GaurdInverseService]},
  {path:'forgetMdp',component:ForgetMdpComponent,canActivate:[GaurdInverseService]},
  {path:"confirme/:id",component:ConfirmeComponent,canActivate:[GaurdInverseService]},

  {path:'patients',component:PatientComponent,canActivate:[GaurdMService]},
  {path:'membres',component:MembreComponent,canActivate:[GaurdMService]},
  {path:'createPatient',component:CreatePatientComponent,canActivate:[GaurdMService]},
  {path:'updatePatient/:id',component:UpdatePatientComponent,canActivate:[GaurdMService]},
  {path:'detailPatient/:id',component:DetailPatientComponent,canActivate:[GaurdMService]},
  {path:'rendezvous',component:RendezVousComponent,canActivate:[GaurdMService]},
  {path:'editProfileMed/:id',component:EditProfileMedComponent,canActivate:[GaurdMService]},
  {path:'consultation',component:ConsultationComponent,canActivate:[GaurdMService]},

  {path:'devices',component:DeviceComponent,canActivate:[GaurdMService]},
  {path:'createDevice',component:CreateDeviceComponent,canActivate:[GaurdMService]},
  {path:'updateDevice/:id',component:UpdateDeviceComponent,canActivate:[GaurdMService]},

  {path:'detailChanel',component:DetailChanelComponent,canActivate:[GaurdService]},
  {path:'messages/:id',component:MessageMPComponent,canActivate:[GaurdService]},
  {path:'profile',component:ProfileComponent,canActivate:[GaurdService]},
  {path:'changepassword',component:ChangePasswordComponent,canActivate:[GaurdService]},

  {path:'donneepat',component:DonneePatComponent,canActivate:[GaurdPService]},
  {path:'rendezvousp',component:RendezVousPatComponent,canActivate:[GaurdPService]},
  {path:'medecin/:id',component:MedecinComponent,canActivate:[GaurdPService]},
  {path:'editProfilePat/:id',component:EditProfilePatComponent,canActivate:[GaurdPService]},

  { path: '**', redirectTo: 'patients'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
