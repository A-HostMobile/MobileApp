import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {LoginPage} from "../login-modal/login-modal";
import {CourierBooking2Page} from "../courier-booking2/courier-booking2";

@Component({
  selector: 'page-courier-booking',
  templateUrl: 'courier-booking.html',
})
export class CourierBookingPage {

  @ViewChild(Navbar) navbar: Navbar;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public mdlCtrl: ModalController,
              public userData: UserData) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierBookingPage');
  }

  ionViewCanEnter(){
    let modal = this.mdlCtrl.create(LoginPage, CourierBookingPage);
    if(this.userData.hasLoggedIn().then((hasLoggedIn) => {
        if (hasLoggedIn === true) {
          return true;
        }
        else {
          this.navCtrl.popToRoot();
          modal.present();
          return false;
        }
      })){
    }
  }

  toCourier2(){
    this.navCtrl.push(CourierBooking2Page);
  }

}

