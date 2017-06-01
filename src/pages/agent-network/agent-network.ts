import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NoInternetModalPage} from "../no-internet-modal/no-internet-modal";

@Component({
  selector: 'page-agent-network',
  templateUrl: 'agent-network.html',
})
export class AgentNetworkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgentNetworkPage');
  }
  gotoNo(){
    this.navCtrl.push(NoInternetModalPage);
  }

}
