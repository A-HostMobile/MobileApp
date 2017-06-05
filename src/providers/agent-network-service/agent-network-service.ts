import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AgentModel } from '../../models/agent';
import { SettingAPI } from '../AppSettings';

/*
  Generated class for the AgentNetworkServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AgentNetworkServiceProvider {

  constructor(public http: Http) {}

  getAgent():Observable<AgentModel[]>{
    return this.http.get(SettingAPI.API+'getAgentList.php')
    .map((res:Response) => <AgentModel[]> res.json().responseData)
    .catch(this.handleError);
  }

  private handleError(error:any){
    return Observable.throw(error.json().errorMessage||'Error From Server!');
  }

}
