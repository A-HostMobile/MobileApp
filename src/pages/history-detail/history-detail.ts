import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryServiceProvider } from '../../providers/history-service/history-service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-history-detail',
  templateUrl: 'history-detail.html',
})
export class HistoryDetailPage {

  lclId: number;

  lclDetails: any;
  lclMaster: any;
  lclDetail: any;
  lclComment: any;

  sub: Subscription;
  errorMessage:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public historyService: HistoryServiceProvider
  ) {
      this.lclId = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryDetailPage');
  }

  ionViewWillEnter(){
    this.getLclDetails();
  }

  private getLclDetails(){
    this.sub = this.historyService.getLclDetail(this.lclId).subscribe((res) => {
      this.lclDetails = res;

      this.lclMaster = this.lclDetails.master;
      this.lclDetail = this.lclDetails.detail;
      this.lclComment = this.lclDetails.comment;
      console.log(this.lclMaster)
      console.log(this.lclDetail)
      console.log(this.lclComment)
    },
      (error) => { this.errorMessage = <any> error }
    );
  }

}
