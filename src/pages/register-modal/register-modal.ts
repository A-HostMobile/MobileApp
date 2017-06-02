import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-register-modal',
  templateUrl: 'register-modal.html',
})
export class RegisterModalPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public platform: Platform) {

    this.platform.ready().then(()=> {
      this.platform.registerBackButtonAction(() => {
        this.viewCtrl.dismiss();
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterModalPage');
  }

}
