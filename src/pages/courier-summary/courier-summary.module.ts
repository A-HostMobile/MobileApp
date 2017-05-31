import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourierSummaryPage } from './courier-summary';

@NgModule({
  declarations: [
    CourierSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(CourierSummaryPage),
  ],
  exports: [
    CourierSummaryPage
  ]
})
export class CourierSummaryPageModule {}
