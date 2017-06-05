import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-register-modal',
  templateUrl: 'register-modal.html',
})
export class RegisterModalPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterModalPage');
  }

}
