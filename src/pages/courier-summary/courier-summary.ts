import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController, Events } from 'ionic-angular';
import {CompletedPage} from "../completed/completed";
import {DgPopupModalPage} from "../dg-popup-modal/dg-popup-modal";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-courier-summary',
  templateUrl: 'courier-summary.html',
})
export class CourierSummaryPage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public mdlCtrl: ModalController,
      public authService: AuthServiceProvider,
      public userData: UserData,
      public events: Events
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierSummaryPage');
  }

  toComplete(){
        // this.navCtrl.push(CompletedPage);
        this.events.publish('checkStsLogin',CompletedPage);
  }

  dgModalShow() {
    let dgModal = this.mdlCtrl.create(DgPopupModalPage);
    dgModal.present();
  }

}
