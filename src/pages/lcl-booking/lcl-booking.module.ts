import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LclBookingPage } from './lcl-booking';

@NgModule({
  declarations: [
    LclBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(LclBookingPage),
  ],
  exports: [
    LclBookingPage
  ]
})
export class LclBookingPageModule {}
