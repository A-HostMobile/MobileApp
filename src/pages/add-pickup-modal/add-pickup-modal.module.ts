import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPickupModalPage } from './add-pickup-modal';

@NgModule({
  declarations: [
    AddPickupModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPickupModalPage),
  ],
  exports: [
    AddPickupModalPage
  ]
})
export class AddPickupModalPageModule {}
