import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoInternetModalPage } from './no-internet-modal';

@NgModule({
  declarations: [
    NoInternetModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NoInternetModalPage),
  ],
  exports: [
    NoInternetModalPage
  ]
})
export class NoInternetModalPageModule {}
