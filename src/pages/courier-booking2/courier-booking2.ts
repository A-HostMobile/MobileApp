import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController } from 'ionic-angular';
import {CourierItemModalPage} from "../courier-item-modal/courier-item-modal";
import {CourierSummaryPage} from "../courier-summary/courier-summary";

@Component({
  selector: 'page-courier-booking2',
  templateUrl: 'courier-booking2.html',
})
export class CourierBooking2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams,public mdlCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierBooking2Page');
  }

  toEditMasterDetail(){
    this.navCtrl.pop();
  }

  toManageItem(status: String) {
    let manageItem = this.mdlCtrl.create(CourierItemModalPage,{status});
    manageItem.present();
  }

  toSummary(){
    this.navCtrl.push(CourierSummaryPage);
  }

}
