import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppSettings } from '../AppSettings';

/*
  Generated class for the QuickcodeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QuickcodeProvider {

  constructor(public http: Http) {
    console.log('Hello QuickcodeProvider Provider');
  }

  getPod(){
    return this.http.get(AppSettings.API_ENDPOINT+'quickcode/pod')
    .map((res:Response)=>res.json())
    .catch(this.handleError);
  }

  getPackage(){
    return this.http.get(AppSettings.API_ENDPOINT+'quickcode/package')
    .map((res:Response)=>res.json())
    .catch(this.handleError);
  }

  getGwunit(){
    return this.http.get(AppSettings.API_ENDPOINT+'quickcode/gwunit')
    .map((res:Response)=>res.json())
    .catch(this.handleError);
  }

  getCountrycode(){
    return this.http.get(AppSettings.API_ENDPOINT+'quickcode/countrycode')
    .map((res:Response)=>res.json())
    .catch(this.handleError);
  }

  getCommodities(){
    return this.http.get(AppSettings.API_ENDPOINT+'quickcode/commodities')
    .map((res:Response)=>res.json())
    .catch(this.handleError);
  }
  
  private handleError(error:any){
    return Observable.throw(error.json().errorMessage||'Error from server!');
  }

}
