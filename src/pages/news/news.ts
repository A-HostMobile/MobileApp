import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,public viewCtrl:ViewController,public advertiseService:AdvertisementProvider) {
  }

  ionViewWillEnter(){
    this.getNews();
    this.getPromotions();
    console.log(this.sub);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  toDetail(item_id:number){
    this.navCtrl.push(NewsDetailPage,item_id);
  }

  private getNews(){
    this.sub = this.advertiseService.getNewsAdvertisment().subscribe(
      (res) => this.news = res,
      (error) => this.errorMessage = <any> error
    );
  }

  private getPromotions(){
    this.sub = this.advertiseService.getPromotionAdvertisment().subscribe(
      (res) => this.promotions = res,
      (error) => this.errorMessage = <any> error
    );
  }

}
