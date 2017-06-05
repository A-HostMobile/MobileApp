import {Component, ViewChild} from '@angular/core';
import {ModalController, Navbar, NavController, NavParams, ViewController} from 'ionic-angular';
import {LclSummaryPage} from "../lcl-summary/lcl-summary";
import {LoginPage} from "../login-modal/login-modal";
import {UserData} from "../../providers/user-data";

@Component({
  selector: 'page-lcl-booking',
  templateUrl: 'lcl-booking.html',
})
export class LclBookingPage {
  @ViewChild(Navbar) navbar : Navbar;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public mdlCtrl: ModalController,
              public userData: UserData) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LclBookingPage');
  }

  ionViewCanEnter(){
    let modal = this.mdlCtrl.create(LoginPage, LclBookingPage);
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn === true) { return true; }
      else { this.navCtrl.pop(); modal.present(); return false; }
    });
  }

  toSummary(){
    this.navCtrl.push(LclSummaryPage);
  }
}
