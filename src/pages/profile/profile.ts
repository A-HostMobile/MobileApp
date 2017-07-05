import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, Events} from 'ionic-angular';
import {HistoryPage} from "../history/history";
import {PickupAddressPage} from "../pickup-address/pickup-address";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public mdlCtrl: ModalController,public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  toHistory(){
    this.events.publish('showLoading');
    this.events.publish('checkStsLogin',HistoryPage,ProfilePage);
  }

  openPickupModal(){
    let manageItem = this.mdlCtrl.create(PickupAddressPage,{page:'ProfilePage'});
    manageItem.present();
  }

}
