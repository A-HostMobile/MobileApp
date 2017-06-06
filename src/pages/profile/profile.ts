import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController } from 'ionic-angular';
import {HistoryPage} from "../history/history";
import {PickupAddressPage} from "../pickup-address/pickup-address";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public mdlCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

toHistory(){
  this.navCtrl.push(HistoryPage,ProfilePage);
}

openPickupModal(){

    let openPickup = this.mdlCtrl.create(PickupAddressPage);
    openPickup.present();

  }

}
