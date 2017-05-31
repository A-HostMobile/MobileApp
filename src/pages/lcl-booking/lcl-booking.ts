import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ViewController} from 'ionic-angular';
import {LclSummaryPage} from "../lcl-summary/lcl-summary";

@Component({
  selector: 'page-lcl-booking',
  templateUrl: 'lcl-booking.html',
})
export class LclBookingPage {
  @ViewChild(Navbar) navbar : Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LclBookingPage');
    this.navbar.backButtonClick = (e:UIEvent)=> {
      if (this.viewCtrl.index == 0) {
        this.navCtrl.popToRoot().then(() => {
          this.navCtrl.first().dismiss();
        });
      }
      else {
        this.navCtrl.popToRoot();
      }
    }
  }


  toSummary(){
    this.navCtrl.push(LclSummaryPage);
  }



}
