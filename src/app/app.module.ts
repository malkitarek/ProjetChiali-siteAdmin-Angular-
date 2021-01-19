import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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

import {MatChipsModule} from '@angular/material/chips';

import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {ChartsModule} from 'ng2-charts';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';

import {MatMenuModule} from '@angular/material/menu';

import {ScrollingModule} from '@angular/cdk/scrolling';

import {
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService,
  RecurrenceEditorModule,
  ScheduleModule,
  WeekService, WorkWeekService
} from '@syncfusion/ej2-angular-schedule';

import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar';

import {EditorModule} from '@tinymce/tinymce-angular';

import {NgxPrintModule} from 'ngx-print';
import {AppComponent} from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PlombierComponent } from './components/plombier/plombier.component';
import { ErreurComponent } from './components/erreur/erreur.component';
import { CreatePlombierComponent } from './components/create-plombier/create-plombier.component';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import { UpdatePlombierComponent } from './components/update-plombier/update-plombier.component';
import { DialogSuppPlombierComponent } from './components/dialogs/dialog-supp-plombier/dialog-supp-plombier.component';
import { DialogAddErreurComponent } from './components/dialogs/dialog-add-erreur/dialog-add-erreur.component';
import { ChangerPasswordComponent } from './components/changer-password/changer-password.component';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlombierComponent,
    ErreurComponent,
    CreatePlombierComponent,
    UpdatePlombierComponent,
    DialogSuppPlombierComponent,
    DialogAddErreurComponent,
    ChangerPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBBq95_i6IUHIxt156FomdrpeDu4Biccc',
      libraries: ['places']
    }),
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
    MatProgressSpinnerModule,
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
    RecurrenceEditorModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
