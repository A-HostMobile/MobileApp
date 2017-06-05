import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams} from 'ionic-angular';
import {CompletedPage} from "../completed/completed";

@Component({
  selector: 'page-lcl-summary',
  templateUrl: 'lcl-summary.html',
})
export class LclSummaryPage {
  @ViewChild(Navbar) navbar:Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LclSummaryPage');
  }

  toCompleted(){
  this.navCtrl.push(CompletedPage);
  }

}
