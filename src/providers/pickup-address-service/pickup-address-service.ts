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
    
    insertPickupAddress(pickupData:any){
        let token = localStorage.getItem('token');
        let profile = JSON.parse(localStorage.getItem('profile'));
        let myHeader = new Headers();
        myHeader.append( 'Authorization', `Bearer ${token}`);
        myHeader.append('Content-Type', 'application/x-www-form-urlencoded');

        let _options = new RequestOptions({headers: myHeader});

        let _body = new URLSearchParams();
          _body.append("partyId",profile.p_party_id)
          _body.append("organizId",profile.p_organization_id)
          _body.append("postCode",pickupData.zipcode)
          _body.append("countryCode",pickupData.country)
          _body.append("contactName",pickupData.contactname)
          _body.append("tel",pickupData.tel)
          _body.append("email",pickupData.email)
          _body.append("address",pickupData.address)
          _body.append("createBy",profile.p_party_id)

        return this.http.post(AppSettings.API_ENDPOINT+'pickupAddress',_body,_options)
          .map((res:Response) => res.json().responseData)
          .catch(this.handleError);
    }

    deletePickupAddress(pickupId:any){
        let token = localStorage.getItem('token');

        let myHeader = new Headers();
        myHeader.append( 'Authorization', `Bearer ${token}`);
        myHeader.append('Content-Type', 'application/x-www-form-urlencoded');

        let _options = new RequestOptions({headers: myHeader});

        return this.http.delete(AppSettings.API_ENDPOINT+'pickupAddress/'+pickupId,_options)
          .map((res:Response) => res.json().responseData)
          .catch(this.handleError);
    }

    updatePickupAddress(pickupData:any){
        let token = localStorage.getItem('token');
        let profile = JSON.parse(localStorage.getItem('profile'));

        let myHeader = new Headers();
        myHeader.append( 'Authorization', `Bearer ${token}`);
        myHeader.append('Content-Type', 'application/x-www-form-urlencoded');

        let _options = new RequestOptions({headers: myHeader});

        let _body = new URLSearchParams();
          _body.append("postCode",pickupData.zipcode)
          _body.append("countryCode",pickupData.country)
          _body.append("contactName",pickupData.contactname)
          _body.append("tel",pickupData.tel)
          _body.append("email",pickupData.email)
          _body.append("address",pickupData.address)
          _body.append("updateBy",profile.p_party_id)
        console.log("BODY DATA:"+JSON.stringify(pickupData));
        return this.http.put(AppSettings.API_ENDPOINT+'pickupAddress/'+pickupData.pickup_id,_body,_options)
          .map((res:Response) => res.json().responseData)
          .catch(this.handleError);
    }
  
    private handleError(error:any){
      return Observable.throw(error.json().errorMessage||'Error from server!');
    }

}
