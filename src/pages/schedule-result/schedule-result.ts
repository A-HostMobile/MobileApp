import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public scheduleService:ScheduleServiceProvider,
    public loadCtrl:LoadingController
  ) {
    this.cname = this.navParams.data;
}

  ionViewWillEnter(){
    this.getSchedule();
  }

  // ionViewDidEnter(){
  //   console.log('test '+this.schedule);
  //   console.log(JSON.stringify(this.schedule));
  // }
  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ScheduleResultPage');
  // }

  toLCLBooking(){
    this.navCtrl.push(LclBookingPage);
  }

  private getSchedule(){
      let loading = this.loadCtrl.create({
        content: "Please wait...",
        spinner: 'hide'
      });
      loading.present();

      this.sub = this.scheduleService.getSchedules(this.cname).subscribe(
        (res) => this.schedule = res,
        (error) => {  this.errorMessage = <any> error,
                      loading.dismiss() },
                () => loading.dismiss()
      );
  }

}
