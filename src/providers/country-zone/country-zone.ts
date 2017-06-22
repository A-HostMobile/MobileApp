import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppSettings } from '../AppSettings';

/*
  Generated class for the CountryZoneProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CountryZoneProvider {

  constructor(public http: Http) {
    console.log('Hello CountryZoneProvider Provider');
  }

  getCountryZone(){
    return this.http.get(AppSettings.API_ENDPOINT+'countryzone')
    .map((res:Response)=>res.json().responseData)
    .catch(this.handleError);
  }

  private handleError(error:any){
    return Observable.throw(error.json().errorMessage||'Error from server!');
  }

}
