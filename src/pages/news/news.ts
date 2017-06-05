import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import {NewsDetailPage} from "../news-detail/news-detail";

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  np: string = "news";
  isAndroid: boolean = false;
  constructor(public navCtrl: NavController,public viewCtrl:ViewController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  toDetail(){
    this.navCtrl.push(NewsDetailPage);
  }

}
