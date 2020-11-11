import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketApiService {
 webSocketEndPoint: string = 'http://localhost:8082/websocket';
  webSocketEndPoint2: string = 'http://localhost:8083/websocket';
 /* webSocketEndPoint: string = 'http://192.168.99.100:30007/websocket';
  webSocketEndPoint2: string = 'http://192.168.99.100:30008/websocket';*/


  constructor(private authSer:AuthService) {}

  connect() {
    //console.log("Initialize WebSocket Connection");

    let socket = new SockJS(this.webSocketEndPoint);
    let stompClient = Stomp.over(socket);
    stompClient.debug=null

    return stompClient;
  }
  connectMessage() {
    //console.log("Initialize WebSocket Connection");

    let socket = new SockJS(this.webSocketEndPoint2);
    let stompClient = Stomp.over(socket);

    stompClient.debug=null
    return stompClient;
  }
}
