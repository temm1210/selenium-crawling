import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { publish, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sessionObservable$: Subject<string> = new Subject<string>();

  constructor(private router: Router, private http: HttpClient) {
    this.sessionObservable$.pipe(publish(),refCount());
  }

  login(user: User): Observable<any>  {
    return this.http.post(`/member/signin`, user);
  }

  getId(id: string): Observable<any> {
    return this.http.get(`/member/${id}`);
  }

  signUp(user: User): Observable<any>{
    return this.http.post('/member/signup',user);
  }

  //세션스토리지，subject관련 메서드
  delSessionStorageItem(key:string){
    sessionStorage.removeItem(key)
    this.sessionObservable$.next(null);
  }

  nextIdToSubscriber(id:string) {
    this.sessionObservable$.next(id); 
  }

  setInfoToSessionStrage(key:string, data:any){
    let userInfo = sessionStorage.setItem("user",JSON.stringify(data));
    this.sessionObservable$.next(data.id);
  }
  //-----------------------------------
}
