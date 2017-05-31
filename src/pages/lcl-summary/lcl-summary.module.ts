import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LclSummaryPage } from './lcl-summary';

@NgModule({
  declarations: [
    LclSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(LclSummaryPage),
  ],
  exports: [
    LclSummaryPage
  ]
})
export class LclSummaryPageModule {}
