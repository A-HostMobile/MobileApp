import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LclBookingPage } from "../lcl-booking/lcl-booking";

import { ScheduleServiceProvider } from '../../providers/schedule-service/schedule-service';
import { ScheduleModel } from '../../models/schedule';
import { Subscription } from 'rxjs/Subscription';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public scheduleService:ScheduleServiceProvider) {
    this.cname = this.navParams.data;
}

  ionViewWillEnter(){
    this.getSchedule();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleResultPage');
  }

  toLCLBooking(){
    this.navCtrl.push(LclBookingPage);
  }

  private getSchedule(){
      this.sub = this.scheduleService.getSchedules(this.cname).subscribe(
        (res) => this.schedule = res,
        (error) => this.errorMessage = <any> error
      );
  }

}
