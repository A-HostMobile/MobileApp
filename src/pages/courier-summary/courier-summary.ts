import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {CompletedPage} from "../completed/completed";
import {DgPopupModalPage} from "../dg-popup-modal/dg-popup-modal";


/**
 * Generated class for the CourierSummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-courier-summary',
  templateUrl: 'courier-summary.html',
})
export class CourierSummaryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public mdlCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierSummaryPage');
  }


  toComplete(){
    this.navCtrl.push(CompletedPage);
  }

  dgModalShow() {
    let dgModal = this.mdlCtrl.create(DgPopupModalPage);
    dgModal.present();
  }

}
