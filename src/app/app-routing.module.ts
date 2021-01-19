import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {PlombierComponent} from './components/plombier/plombier.component';
import {ErreurComponent} from './components/erreur/erreur.component';
import {AuthGuardService} from './services/guard/auth-guard.service';
import {GuardInverseService} from './services/guard/guard-inverse.service';
import {CreatePlombierComponent} from './components/create-plombier/create-plombier.component';
import {UpdatePlombierComponent} from './components/update-plombier/update-plombier.component';
import {ChangerPasswordComponent} from './components/changer-password/changer-password.component';




const routes: Routes = [
  {path: '', redirectTo: 'plombiers', pathMatch: 'full',canActivate:[AuthGuardService]},
  {path: '', redirectTo: 'login', pathMatch: 'full',canActivate:[GuardInverseService]},
  {path:'login',component:LoginComponent,canActivate:[GuardInverseService]},
  {path:'plombiers',component:PlombierComponent,canActivate:[AuthGuardService]},
  {path:'createPlombier',component:CreatePlombierComponent,canActivate:[AuthGuardService]},
  {path:'updatePlombier/:id',component:UpdatePlombierComponent,canActivate:[AuthGuardService]},
  {path:'erreurs',component:ErreurComponent,canActivate:[AuthGuardService]},
  {path:'changerPassword',component:ChangerPasswordComponent,canActivate:[AuthGuardService]},
  {path: '**', redirectTo: 'plombiers'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
