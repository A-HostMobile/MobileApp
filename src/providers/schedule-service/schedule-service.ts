import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AppSettings } from '../AppSettings';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ScheduleModel } from '../../models/schedule';

@Injectable()
export class ScheduleServiceProvider {

  constructor(public http: Http) {}

  getSchedules(countries_name:string):Observable<ScheduleModel[]>{
    return this.http.get(AppSettings.API_ENDPOINT+'schedule/'+countries_name)
    .map((res:Response)=><ScheduleModel[]>res.json().responseData)
    .catch(this.handleError);
  }

  private handleError(error:any){
    return Observable.throw(error.json().errorMessage||'Error from server!');
  }

}
