import { Component } from '@angular/core';
import { ViewController, NavController, LoadingController, Events } from 'ionic-angular';
import { NewsDetailPage } from "../news-detail/news-detail";
import { AdvertisementProvider } from '../../providers/advertisement/advertisement';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  np: string = "news";
  isAndroid: boolean = false;

  news: Array<any>;
  sub: Subscription;
  errorMessage: string;

  promotions: Array<any>;

  constructor(
    public navCtrl: NavController,
    public viewCtrl:ViewController,
    public advertiseService:AdvertisementProvider,
    public loadCtrl:LoadingController,
    public events: Events
  ) {}

  ionViewDidLoad(){
    this.events.publish('showLoading');
      this.getNewsPro();
  }

  toDetail(item_id:number){
    console.log('to detail test');
    this.navCtrl.push(NewsDetailPage,item_id);
  }

  private getNewsPro(){
    this.sub = this.advertiseService.getNewsAdvertisment().subscribe(
      (res) => {
        this.news = res,
        this.advertiseService.getPromotionAdvertisment().subscribe(
          (res) => {
                  this.promotions = res,
                  this.events.publish('dismissLoading')
          },
          (error) => {  this.errorMessage = <any> error
                        // this.events.publish('dismissLoading')
                     }
        )
      },
      (error) => {  this.errorMessage = <any> error
                    this.events.publish('dismissLoading')
                 }
              // () => this.events.publish('dismissLoading')
    );
  }

}
