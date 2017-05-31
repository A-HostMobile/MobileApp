import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgentNetworkPage } from './agent-network';

@NgModule({
  declarations: [
    AgentNetworkPage,
  ],
  imports: [
    IonicPageModule.forChild(AgentNetworkPage),
  ],
  exports: [
    AgentNetworkPage
  ]
})
export class AgentNetworkPageModule {}
