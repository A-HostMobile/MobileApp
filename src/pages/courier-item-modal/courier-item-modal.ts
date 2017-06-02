import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-courier-item-modal',
  templateUrl: 'courier-item-modal.html',
})
export class CourierItemModalPage {
  StatusText: String;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierItemModalPage');
    this.StatusText = this.navParams.get('status');
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }

  addItem(){
      this.viewCtrl.dismiss();
    }
  editItem(){
 this.viewCtrl.dismiss();
  }
}
