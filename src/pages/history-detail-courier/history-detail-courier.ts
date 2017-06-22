import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryServiceProvider } from '../../providers/history-service/history-service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-history-detail-courier',
  templateUrl: 'history-detail-courier.html',
})
export class HistoryDetailCourierPage {

  courierId: any;

  _courierDetails: any;

  courierMaster: any;
  courierDetail: any;
  courierComment: any;

  sub: Subscription;
  errorMessage:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public historyService: HistoryServiceProvider
  ) {
    this.courierId = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryDetailCourierPage');
  }

  ionViewWillEnter(){
      this.getCourierDetails();
  }

  private getCourierDetails(){
    this.sub = this.historyService.getCourierDetail(this.courierId).subscribe((res) => {
      this._courierDetails = res;

      this.courierMaster = this._courierDetails.master;
      this.courierDetail = this._courierDetails.detail;
      this.courierComment = this._courierDetails.comment;
      console.log(this.courierMaster)
      console.log(this.courierDetail)
      console.log(this.courierComment)
    },
      (error) => { this.errorMessage = <any> error }
    );
  }

}
