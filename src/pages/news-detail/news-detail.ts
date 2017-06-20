import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { NewsPage } from '../../pages/news/news';
import { AdvertisementProvider } from '../../providers/advertisement/advertisement';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {

  itemId:number

  NewsDetail: Array<any>;
  sub: Subscription;
  errorMessage:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public advertiseService:AdvertisementProvider,
    public events:Events
  ) {
      this.itemId = this.navParams.data;
  }

  ionViewWillEnter(){
    this.getDetails();
    // console.log(this.NewsDetail);
  }

  ionViewDidLoad() {
    this.events.publish('showLoading');
  }

  private getDetails(){
    this.sub = this.advertiseService.getNewsDetails(this.itemId).subscribe(
      (res) => this.NewsDetail = res,
      (error) => {  this.errorMessage = <any> error,
                    this.events.publish('dismissLoading')
                 },
              () => this.events.publish('dismissLoading')
    );
  }

}
