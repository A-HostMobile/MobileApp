import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HowtoHistoryPage } from './howto-history';

@NgModule({
  declarations: [
    HowtoHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(HowtoHistoryPage),
  ],
  exports: [
    HowtoHistoryPage
  ]
})
export class HowtoHistoryPageModule {}
