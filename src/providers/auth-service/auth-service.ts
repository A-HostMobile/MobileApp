import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppSettings } from '../AppSettings';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {}
  //login
  public doLogin(username:string, password:string):Observable<boolean>{

    let myHeader = new Headers;
    myHeader.append('Content-Type','application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);
    let body = urlSearchParams.toString()

    return this.http.post(AppSettings.API_ENDPOINT+'login',body,{headers:myHeader})
    .map((res:Response) => {
      let _token = res.json().responseData.token;
      if(_token){
        console.log(_token);
        localStorage.setItem('token',_token);
        return true;
      }else{
        return false;
      }
    }).catch(this.handleError);
  }
  //profile
  public getProfile():Observable<object>{
    let token = localStorage.getItem('token');
    // console.log(token);

    let myHeader = new Headers;
    myHeader.append('Content-Type','application/x-www-form-urlencoded');
    myHeader.append('Accept','application/json');
    myHeader.append('Authorization',`Bearer ${token}`);

    let options = new RequestOptions({headers:myHeader});

    console.log(myHeader);

    return this.http.post(AppSettings.API_ENDPOINT+'details',options)
    .map((res:Response) => {
      let profile = <object>res.json();
      if(profile){
        localStorage.setItem('profile', JSON.stringify(profile));
        return profile;
      }
    }).catch(this.handleError);
  }


  private handleError(error:any){
      return Observable.throw(error.json().error_description || "the username or password is incorrect!");
  }

}
