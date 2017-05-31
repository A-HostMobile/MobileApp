import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourierItemModalPage } from './courier-item-modal';

@NgModule({
  declarations: [
    CourierItemModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CourierItemModalPage),
  ],
  exports: [
    CourierItemModalPage
  ]
})
export class CourierItemModalPageModule {}
