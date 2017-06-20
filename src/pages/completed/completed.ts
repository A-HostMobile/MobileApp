import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HistoryPage} from "../history/history";


@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html',
})
export class CompletedPage {
  bookingId:any;
  type:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.bookingId = this.navParams.get("booking_id");
      this.type = this.navParams.get("type");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
  }

  toHome(){
    this.navCtrl.popToRoot();
  }
  toHistory(){
    this.navCtrl.push(HistoryPage,CompletedPage);
  }

}
