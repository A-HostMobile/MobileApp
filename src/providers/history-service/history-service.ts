import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppSettings } from '../AppSettings';

@Injectable()
export class HistoryServiceProvider {

  token: any = localStorage.getItem('token');
  _header = new Headers({ 'Authorization': `Bearer ${this.token}` });
  _options = new RequestOptions({headers: this._header});

  profile = localStorage.getItem('profile');
  _profile = JSON.parse(this.profile);
  partyId = this._profile.p_party_id;

  constructor(public http: Http) {}

  public getLclHistory():Observable<any>{

      console.log(this.partyId);

      return this.http.get(`${AppSettings.API_ENDPOINT}lcl/${this.partyId}`, this._options)
      .map((res:Response) => <any> res.json().responseData)
      .catch(this.handleError);
  }

  public getLclDetail(bookingId:any):Observable<any>{
      return this.http.get(`${AppSettings.API_ENDPOINT}lclDetail/${bookingId}`, this._options)
      .map((res:Response) => <any> res.json().responseData)
      .catch(this.handleError);
  }

  public getCourierHistory():Observable<any>{
      console.log(this.partyId+'from courier');
      return this.http.get(`${AppSettings.API_ENDPOINT}courier/${this.partyId}`, this._options)
      .map((res:Response) => <any> res.json().responseData)
      .catch(this.handleError);
  }

  public getCourierDetail(bookingId:any):Observable<any>{
      return this.http.get(`${AppSettings.API_ENDPOINT}courierDetailHistory/${bookingId}`, this._options)
      .map((res:Response) => <any> res.json().responseData)
      .catch(this.handleError);
  }

  private handleError(error:any){
      return Observable.throw(error.json().errorMessage||'Error From Server!');
  }

}
