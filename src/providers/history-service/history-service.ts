import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppSettings } from '../AppSettings';
import { HistoryModel } from '../../models/history';

@Injectable()
export class HistoryServiceProvider {

  token: any = localStorage.getItem('token');
  _header = new Headers({ 'Authorization': `Bearer ${this.token}` });
  _options = new RequestOptions({headers: this._header});

  constructor(public http: Http) {}

  public getLclHistory():Observable<HistoryModel[]>{

      let profile = localStorage.getItem('profile');
      let _profile = JSON.parse(profile);
      let partyId = _profile.p_party_id;
      console.log(partyId);

      return this.http.get(`${AppSettings.API_ENDPOINT}lcl/${partyId}`, this._options)
      .map((res:Response) => <HistoryModel[]> res.json().responseData)
      .catch(this.handleError);
  }

  public getLclDetail(bookingId:any):Observable<any>{
      return this.http.get(`${AppSettings.API_ENDPOINT}lclDetail/${bookingId}`, this._options)
      .map((res:Response) => <any> res.json().responseData)
      .catch(this.handleError);
  }

  private handleError(error:any){
      return Observable.throw(error.json().errorMessage||'Error From Server!');
  }

}
