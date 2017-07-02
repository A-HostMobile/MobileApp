import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppSettings } from '../AppSettings';
import { FCM } from '@ionic-native/fcm';

@Injectable()
export class FcmServiceProvider {

  token: any = localStorage.getItem('token');
  profiles: any = localStorage.getItem('profile');
  _profile = JSON.parse(this.profiles);
  partyId = this._profile.p_party_id;

  _header: any = new Headers({ 'Authorization': `Bearer ${this.token}`,'Content-Type':'application/x-www-form-urlencoded' });
  _options = new RequestOptions({headers: this._header});

  FCMtoken:any;

  constructor(public http: Http, public fcm:FCM) {
    this.FCMtoken = this.fcm.getToken();
  }

  FCMInsertTokenFn():Observable<any>{
    let _body = ({'party_id':this.partyId,'token': this.FCMtoken});
    return this.http.post(`${AppSettings.API_ENDPOINT}token`,_body,this._options)
    .map((res:Response) => <any> res.json().responseData)
    .catch(this.handleError);
  }

  FCMDeleteTokenFn():Observable<any>{
    let _body = ({'party_id':this.partyId});
    return this.http.delete(`${AppSettings.API_ENDPOINT}token/${this.partyId}`,this._options)
    .map((res:Response) => <any> res.json().responseData)
    .catch(this.handleError);
  }

  private handleError(error:any){
    return Observable.throw(error.json().errorMessage||'Error From Server!');
  }

}
