import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import {HistoryPage} from "../history/history";


@IonicPage()
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
    this.navCtrl.pop
  }
  toHistory(){
    this.navCtrl.push(HistoryPage);
  }

}
