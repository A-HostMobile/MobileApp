import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AgentModel } from '../../models/agent';
import { AgentNetworkServiceProvider } from '../../providers/agent-network-service/agent-network-service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-agent-network',
  templateUrl: 'agent-network.html',
})
export class AgentNetworkPage {

  agent: Array<AgentModel>;
  sub: Subscription;
  errorMessage: string;

  lat: number = 15.8700;
  lng: number = 100.9925;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public agentService: AgentNetworkServiceProvider
  ) {
  }

  ionViewWillEnter(){
    this.getAgent();
  }

  private getAgent(){
    this.sub = this.agentService.getAgent().subscribe(
      (res) => this.agent = res,
      (error) => this.errorMessage = <any> error
    );
  }

  private convertStringToNumber(value: string): number {
        return +value;
  }
}
