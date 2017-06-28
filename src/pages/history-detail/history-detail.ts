import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { HistoryServiceProvider } from '../../providers/history-service/history-service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-history-detail',
  templateUrl: 'history-detail.html',
})
export class HistoryDetailPage {

  lclId: any;

  _lclDetails: any;

  lclMaster: any;
  lclDetail: any;
  lclComment: any;

  sub: Subscription;
  errorMessage:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public historyService: HistoryServiceProvider,
    public events: Events
  ) {
      this.lclId = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryDetailPage');
    this.events.publish('showLoading');
  }

  ionViewWillEnter(){
    this.getLclDetails();
  }

  private getLclDetails(){
    this.sub = this.historyService.getLclDetail(this.lclId).subscribe((res) => {
      this._lclDetails = res;

      this.lclMaster = this._lclDetails.master;
      this.lclDetail = this._lclDetails.detail;
      this.lclComment = this._lclDetails.comment;

      console.log(this.lclMaster);
      console.log(this.lclDetail);
      console.log(this.lclComment);
    },
      (error) => {
        this.errorMessage = <any> error,
        this.events.publish('dismissLoading');
      },
      () => this.events.publish('dismissLoading')
    );
  }



}
