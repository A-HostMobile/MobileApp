import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController ,ModalController} from 'ionic-angular';
import {AddPickupModalPage} from "../add-pickup-modal/add-pickup-modal";
/**
 * Generated class for the PickupAddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pickup-address',
  templateUrl: 'pickup-address.html',
})
export class PickupAddressPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public mdlCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickupAddressPage');
  }

  openManagePickup(){
    let managePickup = this.mdlCtrl.create(AddPickupModalPage);
    managePickup.present();
  }

  closemodal() {
  this.viewCtrl.dismiss();
}

}
