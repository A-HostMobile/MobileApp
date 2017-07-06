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
  work:any;
  status:any;
  message:any;
  constructor(
    public events: Events,
    public userdata: UserData,
    public navParams: NavParams,
    public navCtrl: NavController,
  ) {
      this.bookingId = this.navParams.get("booking_id");
      this.type = this.navParams.get("type");
      this.work = this.navParams.get("work");
      this.message = this.navParams.get("message");
      this.status = this.navParams.get("status");
      if(this.status == 'success'){
        this.success = true;
      } else {
        this.success = false;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
    this.events.publish('dismissLoading');
  }

  toHome(){
    this.navCtrl.popToRoot();
  }
  toHistory(){
    this.events.publish('showLoading');
    this.navCtrl.push(HistoryPage,{pages:CompletedPage,params:this.type});
  }

}
