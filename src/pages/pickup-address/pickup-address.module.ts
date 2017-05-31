import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickupAddressPage } from './pickup-address';

@NgModule({
  declarations: [
    PickupAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(PickupAddressPage),
  ],
  exports: [
    PickupAddressPage
  ]
})
export class PickupAddressPageModule {}
