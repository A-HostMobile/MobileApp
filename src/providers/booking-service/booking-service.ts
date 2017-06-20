import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../AppSettings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


/*
  Generated class for the BookingServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BookingServiceProvider {

  constructor(public http: Http) {
    console.log('Hello BookingServiceProvider Provider');
  }

  insertBookingLCL(formData:any,unixDate:any,scheduleData:any,numCommodity:string,numPackage:string,numGwunit:any){//:Observable<any>{
    let token = localStorage.getItem('token');
    let myHeader = new Headers({ 'Authorization': `Bearer ${token}`});
    myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    let _options = new RequestOptions({headers: myHeader});

    let body = new URLSearchParams();
    body.append("pod",formData.pod)
    body.append("loading",unixDate)
    body.append("commodity",numCommodity)
    body.append("quantity",formData.quantity)
    body.append("unit",numPackage)
    body.append("cbm",formData.volume)
    body.append("gw",formData.gw)
    body.append("addition",formData.detail)
    body.append("remark",scheduleData)
    body.append("gw_unit",numGwunit)
    body.append("create",'100010')
    
    return this.http.post(AppSettings.API_ENDPOINT+'insertLCL',body,_options)
      .map((res:Response) => res.json().responseData)
      .catch(this.handleError);
  }
  
  private handleError(error:any){
    return Observable.throw(error.json().errorMessage||'Error from server!');
  }

}
