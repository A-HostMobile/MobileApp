import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HistoryPage} from "../history/history";


@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html',
})
export class CompletedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
  }

  toHome(){
    this.navCtrl.popToRoot();
  }
  toHistory(){
    this.navCtrl.push(HistoryPage);
  }

}
