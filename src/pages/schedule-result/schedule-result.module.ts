import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleResultPage } from './schedule-result';

@NgModule({
  declarations: [
    ScheduleResultPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleResultPage),
  ],
  exports: [
    ScheduleResultPage
  ]
})
export class ScheduleResultPageModule {}
