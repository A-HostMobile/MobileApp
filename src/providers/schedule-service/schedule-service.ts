import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SettingAPI } from '../AppSettings';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ScheduleModel } from '../../models/schedule';

import { ScheduleResultPage } from '../../pages/schedule-result/schedule-result';
//import { NavParams } from 'ionic-angular';

@Injectable()
export class ScheduleServiceProvider {

  countries: string;

  constructor(public http: Http) {

      // this.countries = scheduleResultPage.getCountriesName();
      // console.log(this.countries);, public scheduleResult:ScheduleResultPage

  }

  getSchedules():Observable<ScheduleModel[]>{
    return this.http.get(SettingAPI.UrlAPI+'schedule/JAKARTA')
    .map((res:Response)=><ScheduleModel[]>res.json().responseData)
    .catch(this.handleError);
  }
  // getSchedules(){
  //     return this.http.get(SettingAPI.UrlAPI+'schedule/JAKARTA')
  //                     .map((res:Response)=>res.json().responseData)
  //                     .catch(this.handleError);
  // }

  private handleError(error:any){
    return Observable.throw(error.json().errorMessage||'Error from server!');
  }

}
