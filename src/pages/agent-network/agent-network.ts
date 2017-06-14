import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

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
    public agentService: AgentNetworkServiceProvider,
    private loadCtrl:LoadingController
  ) {
  }

  ionViewWillEnter(){
    this.getAgent();
    console.log(this.agent);
  }

  private getAgent(){
    let loading = this.loadCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loading.present();
    this.sub = this.agentService.getAgent().subscribe(
      (res) => this.agent = res,
      (error) => {  this.errorMessage = <any> error,
                    loading.dismiss() },
              () => loading.dismiss()
    );
  }

  private convertStringToNumber(value: string): number {
        return +value;
  }
}
