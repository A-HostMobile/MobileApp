import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, Events} from 'ionic-angular';
import { LclBookingPage } from "../lcl-booking/lcl-booking";

import { ScheduleServiceProvider } from '../../providers/schedule-service/schedule-service';
import { ScheduleModel } from '../../models/schedule';
import { Subscription } from 'rxjs/Subscription';
import { UserData } from '../../providers/user-data';

@IonicPage()
@Component({
  selector: 'page-schedule-result',
  templateUrl: 'schedule-result.html',
})
export class ScheduleResultPage {

  cname: string;

  schedule: Array<ScheduleModel>;
  sub: Subscription;
  errorMessage:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public scheduleService:ScheduleServiceProvider,
    public userData: UserData,
    public events: Events
  ) {
    this.cname = this.navParams.data;
}

  ionViewWillEnter(){
    this.getSchedule();
  }

  ionViewDidLoad(){
    this.events.publish('showLoading');
  }


  toLCLBooking(schData:Array<ScheduleModel>){
    this.events.publish('checkStsLogin',LclBookingPage,schData);
  }

  private getSchedule(){
      this.sub = this.scheduleService.getSchedules(this.cname).subscribe(
        (res) => this.schedule = res,
        (error) => {  this.errorMessage = <any> error,
                      this.events.publish('dismissLoading')
                   },
                () => this.events.publish('dismissLoading')
      );
  }

}
