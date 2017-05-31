import { Component } from '@angular/core';
import {IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  np: string = "news";
  isAndroid: boolean = false;
  constructor(public viewCtrl:ViewController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
