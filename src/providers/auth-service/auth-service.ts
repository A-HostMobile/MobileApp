import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppSettings } from '../AppSettings';
import { UserData } from '../user-data';
import {ModalController} from "ionic-angular";
import {LoginPage} from "../../pages/login-modal/login-modal";

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http, public userData: UserData,public mdlCtrl: ModalController) {}
  //login
  public doLogin(username:string, password:string):Observable<any>{

    let myHeader = new Headers;
    myHeader.append('Content-Type','application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);
    let body = urlSearchParams.toString();

    return this.http.post(AppSettings.API_ENDPOINT+'login',body,{headers:myHeader})
    .map((res:Response) => {
      let _token = res.json();
      let sts:boolean;
      if(_token.responseData.token){
        localStorage.setItem('token',_token.responseData.token);
        return true;
      }else{
        return false;
      }
    }).catch(this.handleError);
  }
  //profile
  public getProfile():Observable<any>{
    let token = localStorage.getItem('token');

    let myHeader = new Headers({ 'Authorization': `Bearer ${token}` });
    let _options = new RequestOptions({headers: myHeader});
    let _body = {};

    return this.http.post(AppSettings.API_ENDPOINT+'details',_body,_options)
    .map((res:Response) => {
      let profile = <any>res.json();
      if(profile){
        localStorage.setItem('profile', JSON.stringify(profile.responseData));
        return profile;
      }
    }).catch(this.handleError);
  }

  private handleError(error:any){
      return Observable.throw(error.json().error_description || "the username or password is incorrect!");
  }

  public OpenModal(page:any,param:any){
    let mdl = this.mdlCtrl.create(LoginPage,{page: page,param: param});
    mdl.present();
  }

}
