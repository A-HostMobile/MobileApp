import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourierBooking2Page } from './courier-booking2';

@NgModule({
  declarations: [
    CourierBooking2Page,
  ],
  imports: [
    IonicPageModule.forChild(CourierBooking2Page),
  ],
  exports: [
    CourierBooking2Page
  ]
})
export class CourierBooking2PageModule {}
