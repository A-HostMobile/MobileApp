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

  constructor(
    public events: Events,
    public navParams: NavParams,
    public navCtrl: NavController,
    public mdlCtrl: ModalController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  toHistory(){
    this.events.publish('showLoading');
    this.events.publish('checkStsLogin',HistoryPage,ProfilePage);
  }

  openPickupModal(){
    let manageItem = this.mdlCtrl.create(PickupAddressPage,{pages:'ProfilePage'});
    manageItem.present();
  }

}
