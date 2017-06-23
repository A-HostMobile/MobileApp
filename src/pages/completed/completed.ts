import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import {HistoryPage} from "../history/history";
import {UserData} from "../../providers/user-data";


@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html',
})
export class CompletedPage {
  bookingId:any;
  type:any;
  success:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userdata: UserData,public events: Events) {
      this.bookingId = this.navParams.get("booking_id");
      this.type = this.navParams.get("type");
      if(this.bookingId=='Unauthorized: Access is denied due to invalid credentials.'){
        this.success = false;
      } else {
        this.success = true;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
  }

  toHome(){
    this.navCtrl.popToRoot();
  }
  toHistory(){
    this.events.publish('loadpage');
    this.navCtrl.push(HistoryPage,CompletedPage);
  }

}
