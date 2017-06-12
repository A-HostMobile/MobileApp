import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { CountryModel } from '../../models/countries';
import { AppSettings } from '../AppSettings';

@Injectable()
export class ContinentServiceProvider {

  constructor(public http: Http) {}

  getContinent():Observable<CountryModel[]>{
    return this.http.get(AppSettings.API_ENDPOINT+'continent')
    .map((res:Response)=><CountryModel[]>res.json().responseData)
    .catch(this.handleError);
  }

  private handleError(error:any){
    return Observable.throw(error.json().errorMessage||'Error from server!');
  }

}
