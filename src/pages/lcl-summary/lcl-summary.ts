import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CompletedPage} from "../completed/completed";


@IonicPage()
@Component({
  selector: 'page-lcl-summary',
  templateUrl: 'lcl-summary.html',
})
export class LclSummaryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LclSummaryPage');
  }

  toCompleted(){
  this.navCtrl.push(CompletedPage);
  }

}
