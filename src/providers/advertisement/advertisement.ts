import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { AppSettings } from '../AppSettings';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
/*
  Generated class for the AdvertisementProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AdvertisementProvider {

  constructor(public http: Http) {
    console.log('Hello AdvertisementProvider Provider');
  }

  getHomeAdvertisement(){
      return this.http.get(AppSettings.API_ENDPOINT+'advertisement/home')
                      .map((res:Response)=>res.json().responseData)
                      .catch(this.handleError);
  }

  getNewsAdvertisment():Observable<any>{
      return this.http.get(AppSettings.API_ENDPOINT+'advertisement/news')
                    .map((res:Response)=><any>res.json().responseData)
                    .catch(this.handleError);
  }

  private handleError(error:any){
      return Observable.throw(error.json().errorMessage || "Error From Server");
  }

}
