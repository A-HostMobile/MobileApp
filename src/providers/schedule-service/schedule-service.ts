import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { SettingAPI } from '../AppSettings';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ScheduleServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ScheduleServiceProvider Provider');
  }

  public schedule(cname:string){
    return
  }

}
