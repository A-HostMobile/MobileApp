import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController } from 'ionic-angular';
import {CourierItemModalPage} from "../courier-item-modal/courier-item-modal";
/**
 * Generated class for the CourierBooking2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
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

}
