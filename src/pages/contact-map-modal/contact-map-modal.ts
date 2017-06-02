import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-contact-map-modal',
  templateUrl: 'contact-map-modal.html',
})
export class ContactMapModalPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactMapModalPage');
  }

}
