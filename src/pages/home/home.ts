import { Component } from '@angular/core';
import {NavController, NavParams, ModalController, ViewController} from 'ionic-angular';

import {UserData} from "../../providers/user-data";
import {LclBookingPage} from "../lcl-booking/lcl-booking";
import {CourierBookingPage} from "../courier-booking/courier-booking";
import {LoginPage} from "../login-modal/login-modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public mdlCtrl: ModalController, public userData: UserData, public  viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  ionViewWillEnter(){
    /*if(this.viewCtrl.index>0)
    {
      this.navCtrl.popToRoot();
    }*/
  }

  openPage(page: number) {

    let  view: any;

    if(page == 1){
      view = LclBookingPage;
    }
    else {
      view = CourierBookingPage
    }
    let modal = this.mdlCtrl.create(LoginPage, view);
    if (this.userData.hasLoggedIn().then((hasLoggedIn) => {
        if (hasLoggedIn === true) {
          this.navCtrl.push(view);
        } else {
          modal.present();
        }
      })) {
    }
  }
}
