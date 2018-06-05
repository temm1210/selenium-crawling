import { distinctUntilChanged } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KospiService {

  socket: SocketIOClient.Socket;
  subject$: Subject<any> = new Subject<any>();
  
  constructor(private httpClient: HttpClient) { 
    this.subject$.pipe(distinctUntilChanged());
    this.socket = io.connect("http://localhost:8080");

    this.socket.on('message', (message: any) => this.onMessage(message));
    this.socket.on('error',(err) => this.onError(err));
    this.socket.on('disconnect',(event) => this.onDisconnect());
  }

  getKospi(): Observable<any> {
    return this.httpClient.get('/kospi');
  }
  
  onMessage(message) {
    this.subject$.next(message);
  }
  onError(err:Error) {
    console.log("Err Invoke");
    this.subject$.error(err);
  }
  onDisconnect(){
    console.log("subject$ disconnect");
    this.subject$.complete();
  }

  send(message: any) {
    this.socket.emit('message', message);
  }

}
