import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {CompletedPage} from "../completed/completed";
import {LclBookingPage} from "../lcl-booking/lcl-booking";


@IonicPage()
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
    this.navbar.backButtonClick = (e: UIEvent) => {this.navCtrl.push(LclBookingPage).then(()=>this.navCtrl.first().dismiss());};
  }

  toCompleted(){
  this.navCtrl.push(CompletedPage);
  }

}
