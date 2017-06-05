import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';

@Component({
  selector: 'page-add-pickup-modal',
  templateUrl: 'add-pickup-modal.html',
})
export class AddPickupModalPage {

  constructor(public viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPickupModalPage');
  }

closemodal() {
  this.viewCtrl.dismiss();
}

}
