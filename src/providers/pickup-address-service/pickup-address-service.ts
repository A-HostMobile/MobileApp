import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../AppSettings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


/*
  Generated class for the PickupAddressServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PickupAddressServiceProvider {

  constructor(public http: Http) {
    console.log('Hello PickupAddressServiceProvider Provider');
  }

  getPickupAddress(){
        let token = localStorage.getItem('token');
        let profile = JSON.parse(localStorage.getItem('profile'));
        
        let myHeader = new Headers();
        myHeader.append( 'Authorization', `Bearer ${token}`);
        myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        let _options = new RequestOptions({headers: myHeader});
        return this.http.get(AppSettings.API_ENDPOINT+'pickupAddress/'+profile.p_party_id,_options)
          .map((res:Response) => res.json().responseData)
          .catch(this.handleError);
    }
  
    private handleError(error:any){
      return Observable.throw(error.json().errorMessage||'Error from server!');
    }

}
