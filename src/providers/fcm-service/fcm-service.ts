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

  _header: any = new Headers({ 'Authorization': `Bearer ${this.token}`,'Content-Type':'application/x-www-form-urlencoded' });
  _options = new RequestOptions({headers: this._header});

  constructor(public http: Http) {}

  FCMInsertTokenFn(FCMParty_id:any,FCMtoken:any):Observable<any>{

    let _body = ({'party_id':FCMParty_id,'token': FCMtoken});

    return this.http.post(AppSettings.API_ENDPOINT+'token',_body,this._options)
    .map((res:Response) => <any> res.json().responseData)
    .catch(this.handleError);
  }

  FCMDeleteTokenFn():Observable<any>{
    let profiles: any = localStorage.getItem('profile');
    let _profile = JSON.parse(profiles);
    let partyId = _profile.p_party_id;

    return this.http.delete(AppSettings.API_ENDPOINT+'token/'+partyId,this._options)
    .map((res:Response) => <any> res.json().responseData)
    .catch(this.handleError);
  }

  private handleError(error:any){
    return Observable.throw(error.json().errorMessage||'Error From Server!');
  }

}
