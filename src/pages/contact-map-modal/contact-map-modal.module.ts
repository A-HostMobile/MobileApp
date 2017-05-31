import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactMapModalPage } from './contact-map-modal';

@NgModule({
  declarations: [
    ContactMapModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactMapModalPage),
  ],
  exports: [
    ContactMapModalPage
  ]
})
export class ContactMapModalPageModule {}
