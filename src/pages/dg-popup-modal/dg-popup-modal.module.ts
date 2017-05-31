import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DgPopupModalPage } from './dg-popup-modal';

@NgModule({
  declarations: [
    DgPopupModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DgPopupModalPage),
  ],
  exports: [
    DgPopupModalPage
  ]
})
export class DgPopupModalPageModule {}
