import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HowtoLclPage } from './howto-lcl';

@NgModule({
  declarations: [
    HowtoLclPage,
  ],
  imports: [
    IonicPageModule.forChild(HowtoLclPage),
  ],
  exports: [
    HowtoLclPage
  ]
})
export class HowtoLclPageModule {}
