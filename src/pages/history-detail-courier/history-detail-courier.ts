import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-history-detail-courier',
  templateUrl: 'history-detail-courier.html',
})
export class HistoryDetailCourierPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryDetailCourierPage');
  }

}
