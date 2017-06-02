import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {LclBookingPage} from "../lcl-booking/lcl-booking";


@IonicPage()
@Component({
  selector: 'page-schedule-result',
  templateUrl: 'schedule-result.html',
})
export class ScheduleResultPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleResultPage');
  }

  toLCLBooking(){
    this.navCtrl.push(LclBookingPage);
  }

}
