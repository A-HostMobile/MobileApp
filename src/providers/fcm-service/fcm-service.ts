import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppSettings } from '../AppSettings';

@Injectable()
export class FcmServiceProvider {

  token: any = localStorage.getItem('token');

  constructor(public http: Http) {}

  FCMInsertTokenFn(FCMParty_id:any,FCMtoken:any):Observable<any>{

    let _body = new URLSearchParams();
    _body.append('party_id', FCMParty_id);
    _body.append('token', FCMtoken);
    // let _body = urlSearchParams.toString();

    let _header = new Headers();
    _header.append( 'Authorization', `Bearer ${this.token}`);
    _header.append('Content-Type', 'application/x-www-form-urlencoded');
    let _options = new RequestOptions({headers: _header});

    console.log('party_id from FCMInsertFN: '+FCMParty_id);
    console.log('token from FCMInsertFN: '+FCMtoken);
    return this.http.post(AppSettings.API_ENDPOINT+'token',_body,_options)
    .map((res:Response) => <any> res.json().responseData)
    .catch(this.handleError);
  }

  FCMDeleteTokenFn():Observable<any>{
    let profiles: any = localStorage.getItem('profile');
    let _profile = JSON.parse(profiles);
    let partyId = _profile.p_party_id;

    let _header = new Headers();
    _header.append( 'Authorization', `Bearer ${this.token}`);
    _header.append('Content-Type', 'application/x-www-form-urlencoded');
    let _options = new RequestOptions({headers: _header});

    return this.http.delete(AppSettings.API_ENDPOINT+'token/'+partyId,_options)
    .map((res:Response) => <any> res.json().responseData)
    .catch(this.handleError);
  }

  private handleError(error:any){
    return Observable.throw(error.json().errorMessage||'Error From Server!');
  }

}
