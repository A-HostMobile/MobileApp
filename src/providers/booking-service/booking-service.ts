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
      let profile = JSON.parse(localStorage.getItem('profile'));

      let myHeader = new Headers();
      myHeader.append( 'Authorization', `Bearer ${token}`);
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
      body.append("create",profile.p_party_id)
      
      return this.http.post(AppSettings.API_ENDPOINT+'insertLCL',body,_options)
        .map((res:Response) => res.json().responseData)
        .catch(this.handleError);
    }

    insertBookingCourier(courierData:any){
      let token = localStorage.getItem('token');
      let profile = JSON.parse(localStorage.getItem('profile'));

      let myHeader = new Headers();
      myHeader.append( 'Authorization', `Bearer ${token}`);
      myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      let _options = new RequestOptions({headers: myHeader});
  
      let body = new URLSearchParams();
      body.append("countryCode",courierData.country)
      body.append("contact",courierData.contname+" "+courierData.tel)
      body.append("createBy",profile.p_party_id)
      body.append("destination",courierData.address)
      body.append("remark",courierData.rmk)
      body.append("pickupAddress",courierData.pickup)
      body.append("postcode",courierData.zipcode)
      body.append("consignee",courierData.conname)
      
      return this.http.post(AppSettings.API_ENDPOINT+'courier',body,_options)
        .map((res:Response) => res.json().responseData)
        .catch(this.handleError);

    }

    updateBookingCourier(courierData:any){
      let token = localStorage.getItem('token');

      let myHeader = new Headers();
      myHeader.append( 'Authorization', `Bearer ${token}`);
      myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      let _options = new RequestOptions({headers: myHeader});
  
      let body = new URLSearchParams();
      body.append("countryCode",courierData.country)
      body.append("contactInfo",courierData.contname+" "+courierData.tel)
      body.append("destination",courierData.address)
      body.append("remark",courierData.rmk)
      body.append("pickupAddress",courierData.pickup)
      body.append("postCode",courierData.zipcode)
      body.append("consigneeName",courierData.conname)
      
      return this.http.put(AppSettings.API_ENDPOINT+'courier/'+courierData.bookingId,body,_options)
        .map((res:Response) => res.json().responseData)
        .catch(this.handleError);

    }

    getCourierDetail(bookingId:any):Observable<any>{
      let token = localStorage.getItem('token');

      let myHeader = new Headers({ 'Authorization': `Bearer ${token}` });
      let _options = new RequestOptions({headers: myHeader});
  
      return this.http.get(AppSettings.API_ENDPOINT+'courierDetail/'+bookingId,_options)
      .map((res:Response) => <any>res.json().responseData)
      .catch(this.handleError);
    }

    updateBookingStatus(bookingId:any,statusCode:any,bookingType:any){
      console.log("Booking ID:"+bookingId+"/"+statusCode+"/"+bookingType);
      let token = localStorage.getItem('token');
      let profile = JSON.parse(localStorage.getItem('profile'));

      let myHeader = new Headers();
      myHeader.append('Authorization', `Bearer ${token}`);
      myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      let _options = new RequestOptions({headers: myHeader});
  
      let body = new URLSearchParams();
      body.append("bookingId",bookingId)
      body.append("statusCode",statusCode)
      body.append("bookingType",bookingType)
      body.append("updateBy",profile.p_party_id)
      
      return this.http.post(AppSettings.API_ENDPOINT+'updateStatus',body,_options)
        .map((res:Response) => res.json())
        .catch(this.handleError);
    }

    insertCourierItem(itemData:any,bookingID:any){
      let token = localStorage.getItem('token');

      let myHeader = new Headers();
      myHeader.append( 'Authorization', `Bearer ${token}`);
      myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      let _options = new RequestOptions({headers: myHeader});
  
      let body = new URLSearchParams();
      body.append("bookingId",bookingID)
      body.append("commodityCode",itemData.commodity)
      body.append("weight",itemData.weight)
      body.append("width",itemData.dwidth)
      body.append("long",itemData.dlength)
      body.append("height",itemData.dheight)
      body.append("qty",itemData.quantity)
      
      return this.http.post(AppSettings.API_ENDPOINT+'courierItem',body,_options)
        .map((res:Response) => res.json().responseData)
        .catch(this.handleError);
    }

    updateCourierItem(itemData:any,bookingID:any,bookingSeq:any){
      let token = localStorage.getItem('token');

      let myHeader = new Headers();
      myHeader.append( 'Authorization', `Bearer ${token}`);
      myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      let _options = new RequestOptions({headers: myHeader});
  
      let body = new URLSearchParams();
      body.append("index",bookingSeq)
      body.append("commodityCode",itemData.commodity)
      body.append("weight",itemData.weight)
      body.append("width",itemData.dwidth)
      body.append("long",itemData.dlength)
      body.append("height",itemData.dheight)
      body.append("qty",itemData.quantity)
      
      return this.http.put(AppSettings.API_ENDPOINT+'courierItem/'+bookingID,body,_options)
        .map((res:Response) => res.json().responseData)
        .catch(this.handleError);

    }

    deleteCourierItem(bookingID:any,bookingSeq:any){
      let token = localStorage.getItem('token');

      let myHeader = new Headers();
      myHeader.append( 'Authorization', `Bearer ${token}`);
      myHeader.append('Content-Type', 'application/x-www-form-urlencoded');

      let body = new URLSearchParams();
      body.append("index",bookingSeq);

      let _options = new RequestOptions({headers: myHeader,body: body});
  
      
      
      return this.http.delete(AppSettings.API_ENDPOINT+'courierItem/'+bookingID,_options)
        .map((res:Response) => res.json().responseData)
        .catch(this.handleError);

    }
  
    private handleError(error:any){
      console.log("error message"+JSON.stringify(error));
      return Observable.throw(error.json().errorMessage||'Error from server!');
    }

}
