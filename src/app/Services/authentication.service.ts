import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService
{
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



  public userSubject = new BehaviorSubject(null);
  public user = new Observable<User>(null);
  constructor(private router: Router, private http: HttpClient)
  {
  
    this.userSubject.next(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }


  get isLoggedIn() 
  {
    return this.loggedIn.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
  }

  login(usr: User)
  {
    return this.http.post<any>(`${environment.apiUrl}Auth/login`, usr)
            .pipe(map(userd => {
              localStorage.setItem('user', userd['user']);
              localStorage.setItem('jwt', userd['token']);
              localStorage.setItem("refreshToken", userd['refreshToken']);
              
              
              this.userSubject.next(JSON.parse(localStorage.getItem('user')));
              this.loggedIn.next(true);
              // this.loggedIn.subscribe((y) => { console.log("SERVICE_BOOLEAN=========",y);})
              
              return userd;
            }));

    //return this.http.post<any>(`${environment.apiUrl}Auth/login`, usr);
  }
  getLoadData(url: string) {
    return this.http.get(environment.apiUrl + url, { headers: { 'content-type': 'application/json' } }).toPromise();

  }
  postData(url: string, obj: object) {
     return this.http.post(environment.apiUrl + url, JSON.stringify(obj), { headers: { 'content-type': 'application/json' } }).toPromise();
  }

  logout() 
  {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
