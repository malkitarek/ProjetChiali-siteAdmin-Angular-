import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PatientComponent } from './components/patient/patient.component';
import { ConfirmeComponent } from './components/confirme/confirme.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetMdpComponent } from './components/forget-mdp/forget-mdp.component';
import { MembreComponent } from './components/membre/membre.component';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatFormField, MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UpdatePatientComponent } from './components/update-patient/update-patient.component';
import {MatChipsModule} from '@angular/material/chips';
import { DetailPatientComponent } from './components/detail-patient/detail-patient.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { DeviceComponent } from './components/device/device.component';
import { CreateDeviceComponent } from './components/create-device/create-device.component';
import { UpdateDeviceComponent } from './components/update-device/update-device.component';
import { DetailChanelComponent } from './components/detail-chanel/detail-chanel.component';
import {ChartsModule} from 'ng2-charts';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import { DialogSuppMembreComponent } from './components/dialogs/dialog-supp-membre/dialog-supp-membre.component';
import { DialogAffilMembreComponent } from './components/dialogs/dialog-affil-membre/dialog-affil-membre.component';
import { DialogAddConsultationComponent } from './components/dialogs/dialog-add-consultation/dialog-add-consultation.component';
import { DialogSuppConsultationComponent } from './components/dialogs/dialog-supp-consultation/dialog-supp-consultation.component';
import {MatMenuModule} from '@angular/material/menu';
import { MessageMPComponent } from './components/message-m-p/message-m-p.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { RendezVousComponent } from './components/rendez-vous/rendez-vous.component';
import {
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService,
  RecurrenceEditorModule,
  ScheduleModule,
  WeekService, WorkWeekService
} from '@syncfusion/ej2-angular-schedule';
import { ServiceComponent } from './components/service/service.component';
import { RendezVousPatComponent } from './components/rendez-vous-pat/rendez-vous-pat.component';
import { DialogValiderRendezComponent } from './components/dialogs/dialog-valider-rendez/dialog-valider-rendez.component';
import { DonneePatComponent } from './components/donnee-pat/donnee-pat.component';
import { MedecinComponent } from './components/medecin/medecin.component';
import { DialogSuppDeviceComponent } from './components/dialogs/dialog-supp-device/dialog-supp-device.component';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileMedComponent } from './components/edit-profile-med/edit-profile-med.component';
import { EditProfilePatComponent } from './components/edit-profile-pat/edit-profile-pat.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { DialogShowConsultationComponent } from './components/dialogs/dialog-show-consultation/dialog-show-consultation.component';
import {NgxPrintModule} from 'ngx-print';
import { DialogRapportComponent } from './components/dialogs/dialog-rapport/dialog-rapport.component';
import { DialogOrdonnanceComponent } from './components/dialogs/dialog-ordonnance/dialog-ordonnance.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PatientComponent,
    ConfirmeComponent,
    RegisterComponent,
    ForgetMdpComponent,
    MembreComponent,
    CreatePatientComponent,
    UpdatePatientComponent,
    DetailPatientComponent,
    DeviceComponent,
    CreateDeviceComponent,
    UpdateDeviceComponent,
    DetailChanelComponent,
    DialogSuppMembreComponent,
    DialogAffilMembreComponent,
    DialogAddConsultationComponent,
    DialogSuppConsultationComponent,
    MessageMPComponent,
    RendezVousComponent,
    ServiceComponent,
    RendezVousPatComponent,
    DialogValiderRendezComponent,
    DonneePatComponent,
    MedecinComponent,
    DialogSuppDeviceComponent,
    ProfileComponent,
    EditProfileMedComponent,
    EditProfilePatComponent,
    ChangePasswordComponent,
    ConsultationComponent,
    DialogShowConsultationComponent,
    DialogRapportComponent,
    DialogOrdonnanceComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    EditorModule,
    NgxPrintModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule ,
    MatCardModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatTabsModule,
    MatTreeModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDatepickerModule,
    ScrollingModule,
    MatNativeDateModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatBadgeModule,
    ReactiveFormsModule,
    ChartsModule,
    ScheduleModule,


    RecurrenceEditorModule


  ],
  providers: [DayService,WeekService,MonthService,MonthAgendaService,WorkWeekService,AgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
