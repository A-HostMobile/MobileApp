import { Component } from '@angular/core';
import {ViewController, Events, Platform} from 'ionic-angular';
import {Network} from "@ionic-native/network";

@Component({
  selector: 'page-no-internet-modal',
  templateUrl: 'no-internet-modal.html',
})
export class NoInternetModalPage {
  bpress: number = 0;

  constructor(public network: Network,
              public platform: Platform,
              public events: Events,
              public view: ViewController){
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.events.publish('exit');
      })
    })
  }

  ionViewDidLeave(){
    this.events.publish('backButton');
  }

  connected = this.network.onConnect().subscribe(()=>{
    this.view.dismiss();
  })

}
