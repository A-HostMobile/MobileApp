import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
}
