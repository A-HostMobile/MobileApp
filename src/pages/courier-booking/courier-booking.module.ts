import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourierBookingPage } from './courier-booking';

@NgModule({
  declarations: [
    CourierBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(CourierBookingPage),
  ],
  exports: [
    CourierBookingPage
  ]
})
export class CourierBookingPageModule {}
