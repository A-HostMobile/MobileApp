import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AppSettings } from '../AppSettings';
import { Observable } from 'rxjs/Observable';
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

}
