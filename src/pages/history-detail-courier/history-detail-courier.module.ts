import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryDetailCourierPage } from './history-detail-courier';

@NgModule({
  declarations: [
    HistoryDetailCourierPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryDetailCourierPage),
  ],
  exports: [
    HistoryDetailCourierPage
  ]
})
export class HistoryDetailCourierPageModule {}
