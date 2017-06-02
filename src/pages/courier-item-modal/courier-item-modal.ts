import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-courier-item-modal',
  templateUrl: 'courier-item-modal.html',
})
export class CourierItemModalPage {

  constructor(public viewCtrl: ViewController,
              public platform: Platform) {
    this.platform.ready().then(()=> {
      this.platform.registerBackButtonAction(() => {
        this.viewCtrl.dismiss();
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierItemModalPage');
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }
}
