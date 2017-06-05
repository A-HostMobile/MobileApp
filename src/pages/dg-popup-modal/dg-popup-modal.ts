import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-dg-popup-modal',
  templateUrl: 'dg-popup-modal.html',
})
export class DgPopupModalPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DgPopupModalPage');
  }

  closemodal() {
  this.viewCtrl.dismiss();
  }

}
