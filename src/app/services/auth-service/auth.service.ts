import { Injectable } from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 public host="http://localhost:8888"
 // public host="http://192.168.99.100:30006"
  public jwtToken=null;
  public roles;
  public isConnected :boolean=false;
  constructor(private http:HttpClient) { }
/******************************************************** Authentification **********************************************************/
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

  saveUser(user,etat) {
    return this.http.post(this.host+'/register/'+etat,user);
  }
  saveCode(code,id) {
    return this.http.post(this.host+'/confirme/'+id,code);
  }


  /**************************************************** Gestion de médecin ***********************************************************/
  getEmail(){
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
    if(this.getRole()=="MEDECIN")
    return  this.http.get(this.host+'/suivi-patient-service/medecin/'+this.getEmail(),{headers:new HttpHeaders({'Authorization':this.jwtToken})});
    else if(this.getRole()=="PATIENT")
      return  this.http.get(this.host+'/suivi-patient-service/patient/'+this.getEmail(),{headers:new HttpHeaders({'Authorization':this.jwtToken})});

  }

  getServices() {
    return this.http.get(this.host+"/suivi-patient-service/services",{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }



 /******************************************************* Gestion des patients **********************************************************/
  getPatinets() {
    return this.http.get(this.host+'/suivi-patient-service/patients',{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  getPatient(idPat) {
    return this.http.get(this.host+'/suivi-patient-service/patientchanel/'+idPat,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  getMembres(idMed) {
    return this.http.get(this.host+'/suivi-patient-service/membres/'+idMed,{headers:new HttpHeaders({'Authorization':this.jwtToken})});

  }
  affilerPatient(idPat,idMed){
    return this.http.get(this.host+'/suivi-patient-service/affilier/'+idPat+'/'+idMed,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  supprimer(idPat,idMed) {
    return this.http.get(this.host+"/suivi-patient-service/supprimer/"+idPat+"/"+idMed,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  savePatient(patient){
    return this.http.post(this.host+"/suivi-patient-service/patients",patient,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
}


  getMembre(idPat, idMed) {
    return this.http.get(this.host+"/suivi-patient-service/patients/"+idPat+"/"+idMed,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  updatePatient(patient,idPat) {
    return this.http.put(this.host+"/suivi-patient-service/patients/"+idPat,patient,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getMedecinsTraitants(idPat){
    return this.http.get(this.host+"/suivi-patient-service/medecinsTraitants/"+idPat,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  /********************************************** Gestion des consultation ************************************************************/

  saveConsulation(consulation) {
    return this.http.post(this.host+"/suivi-patient-service/consulations",consulation,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getConsulations(idPat, idMed) {
    return this.http.get(this.host+"/suivi-patient-service/consulations/"+idPat+"/"+idMed,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  deleteCons(idCons) {
    return this.http.delete(this.host+"/suivi-patient-service/consulations/"+idCons,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  /************************************************** Gestion des devices *******************************************************/
  getDevices(){
    return  this.http.get(this.host+"/device-service/devices",{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  saveDevice(device) {

    return this.http.post(this.host+"/device-service/devices",device,{headers:new HttpHeaders({'Authorization':this.jwtToken})});

  }

  deleteDevice(id,idPat) {
    return this.http.delete(this.host+"/device-service/devices/"+id+"/"+idPat,{headers:new HttpHeaders({'Authorization':this.jwtToken})});

  }

  getDevice(id) {

     return this.http.get(this.host+"/device-service/devices/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken})})


  }

  updateDevice(device) {
    return this.http.put(this.host+"/device-service/devices",device,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  //getCapteurs() {return this.http.get(this.host+"/device-service/capteurs",{headers:new HttpHeaders({'Authorization':this.jwtToken})});}

 // getDeviceCapteurs(idDev) {return this.http.get(this.host+"/device-service/capteurs/"+idDev,{headers:new HttpHeaders({'Authorization':this.jwtToken})});}

  /***********************************************************************fin Device **************************************************/

  /************************************ list chanels *********************************************************/

  getChanel(idPat) {
    return this.http.get(this.host+"/device-service/chanels/"+idPat,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getDonnees(idPat, idChanel,nomFeild) {

    return this.http.get(this.host+"/device-service/donnees?patient_id="+idPat+"&chanel_id="+idChanel+"&feild_nom="+nomFeild,{headers:new HttpHeaders({'Authorization':this.jwtToken})});

  }
  getLastMesure(idPat, idChanel, nomFeild) {
    return this.http.get(this.host+"/device-service/lastDonnees?patient_id="+idPat+"&chanel_id="+idChanel+"&feild_nom="+nomFeild,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  getFeilds(idPat,idChanel) {
    return this.http.get(this.host+"/device-service/feilds?patient_id="+idPat+"&chanel_id="+idChanel,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  /****************************************** gestion messagerie******************************************************/
  getUserLastMsg(idUser,roleUser){
    return this.http.get(this.host+"/communication-service/messageLast/"+idUser+"/"+roleUser,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getMessages(idMed, idPat,role) {
    return this.http.get(this.host+"/communication-service/messages/"+idMed+"/"+idPat+"/"+role,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  sendMessage(message) {
    return this.http.post(this.host+"/communication-service/messages",message,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getUnreadMsg(idUser, idMem,role) {
    return this.http.get(this.host+"/communication-service/messagesUnread/"+idUser+"/"+idMem+"/"+role,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getAllMessageNoReader(idUser,fromQui) {
    return this.http.get(this.host+"/communication-service/allmessagesUnread/"+idUser+"/"+fromQui,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getMembresMsg(idUser,roleUser) {
    return this.http.get(this.host+"/communication-service/membresMsg/"+idUser+"/"+roleUser,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  /******************************************** Gestion rendez vous **********************************************/
  getRendezVous(idMed) {
    return this.http.get(this.host+"/communication-service/rendezVous/"+idMed,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getRendezVousMedLast(idMed) {
    return this.http.get(this.host+"/communication-service/rendezVousMlast/"+idMed,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  saveRendezVous(rendez) {
    return this.http.post(this.host+"/communication-service/rendezVous",rendez,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  deleteRendez(id) {
    return this.http.delete(this.host+"/communication-service/rendezVous/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  updateRendez(rendez) {
    return this.http.put(this.host+"/communication-service/rendezVous",rendez,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getRendezVousP(idPat) {
    return this.http.get(this.host+"/communication-service/rendezVousP/"+idPat,{headers:new HttpHeaders({'Authorization':this.jwtToken})});

  }

  validerRendez(idRendez) {
    return this.http.get(this.host+"/communication-service/validerRendez/"+idRendez,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getNotifications(idUser, role) {
    return this.http.get(this.host+"/communication-service/notifications/"+idUser+"/"+role,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  /****************** gestion medecins pour un patient********************************************************/
  getMedecin(idMed) {
    return this.http.get(this.host+"/suivi-patient-service/medecins/"+idMed,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

/*******************************************profile******************************************/
  editProfileMed(medecin,idMed) {
     return this.http.put(this.host+"/suivi-patient-service/profileEditMed/"+idMed,medecin,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }
  editProfilePat(patient,idPat) {
    return this.http.put(this.host+"/suivi-patient-service/profileEditPat/"+idPat,patient,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

  changeMdp(change,username) {
    return this.http.post(this.host+'/change/'+username,change,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }



}
