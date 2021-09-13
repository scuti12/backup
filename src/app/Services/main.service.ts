import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private router: Router,private http: HttpClient) { }
  getLoadData(url: string) 
  {
    return this.http.get(environment.apiUrl + url, { headers: { 'content-type': 'application/json' } }).toPromise();
  }
  postData(url: string, obj: object) {
    return this.http.post(environment.apiUrl + url, JSON.stringify(obj), { headers: { 'content-type': 'application/json' } }).toPromise();
  }
  getLoadDataNoPromise(url: string) {
    return this.http.get<any>(environment.apiUrl + url);
  }
  postDataNoPromise(url: string, obj: object) {
    return this.http.post<any>(environment.apiUrl + url,obj);
  }
  postDataNoPromise1(url: string, obj: any) {
    return this.http.post<any>(environment.apiUrl + url,JSON.stringify(obj),{ headers: { 'content-type': 'application/json' } } );
  }


  private _listeners=new Subject<any>();
  listen():Observable<any>
  {
    return this._listeners.asObservable();
  }
  filter(filterBy :string)
  {
    this._listeners.next(filterBy);
  }


/*
  getLoadDataNoPromise(url:string): Observable<any> 
  {
    return  this.http.get(environment.apiUrl + url,  {headers: { 'content-type': 'application/json' }});
  }*/
}
