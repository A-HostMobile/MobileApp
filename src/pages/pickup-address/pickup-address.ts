import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController ,ModalController} from 'ionic-angular';
import {AddPickupModalPage} from "../add-pickup-modal/add-pickup-modal";

@IonicPage()
@Component({
  selector: 'page-pickup-address',
  templateUrl: 'pickup-address.html',
})
export class PickupAddressPage {

  address: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public mdlCtrl: ModalController) {
    this.address = 'Somewhere 987/645-1 example address state province 99999';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickupAddressPage');
  }

  openManagePickup(){
    let managePickup = this.mdlCtrl.create(AddPickupModalPage);
    managePickup.present();
  }

  selected() {
    this.viewCtrl.dismiss(this.address);
  }

  closeModal(){
    this.address=null;
    this.viewCtrl.dismiss(this.address);
  }


}
