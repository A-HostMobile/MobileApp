import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';
import {Network} from "@ionic-native/network";

@Component({
  selector: 'page-no-internet-modal',
  templateUrl: 'no-internet-modal.html',
})
export class NoInternetModalPage {

  constructor(public network: Network,public view: ViewController) {
  }

  connected = this.network.onConnect().subscribe(()=>{
    this.view.dismiss();
  })

}
