import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HowtoCourierPage } from './howto-courier';

@NgModule({
  declarations: [
    HowtoCourierPage,
  ],
  imports: [
    IonicPageModule.forChild(HowtoCourierPage),
  ],
  exports: [
    HowtoCourierPage
  ]
})
export class HowtoCourierPageModule {}
