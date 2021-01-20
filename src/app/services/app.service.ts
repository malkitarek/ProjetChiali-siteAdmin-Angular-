import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelper} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  //public host="http://localhost:8888"
  public host="http://chiali-backend.herokuapp.com";
  public jwtToken;
  constructor(private http:HttpClient) { }
  /**********************************************authentification *******************************************/
  login(user){
    return this.http.post(this.host+"/login",user,{observe:'response'});
  }
  saveToken(jwt) {
    localStorage.setItem('token',jwt);
  }
  loadToken(){
    this.jwtToken=localStorage.getItem("token");
  }

  logout(){
    this.jwtToken=null;
    localStorage.removeItem('token');
  }
  getUsername(){
    this.jwtToken=localStorage.getItem("token");
    let jwtHelper=new JwtHelper();
    if(this.jwtToken!=null) return jwtHelper.decodeToken(this.jwtToken).sub
    else return null;
  }
  getRole(){
    this.jwtToken=localStorage.getItem("token");
    let jwtHelper=new JwtHelper();
    if(this.jwtToken!=null) return jwtHelper.decodeToken(this.jwtToken).roles[0].authority
    else return null;
  }
  getUser(){
      return  this.http.get(this.host+'/compte/admin/'+this.getUsername(),{headers:new HttpHeaders({'Authorization':this.jwtToken})});
      }
  changeMdp(change,username) {
    return this.http.post(this.host+'/change/'+username,change,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  /*************************************************gestion plombiers ***************************************/
  getPlombiers(){
    return this.http.get(this.host+"/plombiers",{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  getPlombier(id){
    return this.http.get(this.host+"/plombiers/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  addPlombier(plombier){
    return this.http.post(this.host+"/plombiers",plombier,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  updatePlombier(plombier,idPlo,idCompte,idLocation){
    return this.http.put(this.host+"/plombiers/"+idPlo+"/"+idCompte+'/'+idLocation,plombier,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  deletePlombier(id){
    return this.http.delete(this.host+"/plombiers/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  getVilles(){
    return this.http.get(this.host+"/villes",{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  /*************************************************gestion d'erreur ***************************************/
  getErreurs(){
    return this.http.get(this.host+"/erreurs",{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  getErreur(id){
    return this.http.get(this.host+"/erreurs/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  addErreur(erreur){
    return this.http.post(this.host+"/erreurs",erreur,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  updateErreur(erreur,id){
    return this.http.put(this.host+"/erreurs/"+id,erreur,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  deleteErreur(id) {
    return this.http.delete(this.host+"/erreurs/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
}
