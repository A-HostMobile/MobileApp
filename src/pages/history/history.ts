import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HistoryDetailPage} from "../history-detail/history-detail";
import {HistoryDetailCourierPage} from "../history-detail-courier/history-detail-courier";


@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  historyTab: string = "lcl";
  isAndroid: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  toLCL(){
  this.navCtrl.push(HistoryDetailPage);
}

  toCourier(){
  this.navCtrl.push(HistoryDetailCourierPage);
  }

}
