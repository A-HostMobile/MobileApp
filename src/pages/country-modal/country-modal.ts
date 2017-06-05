import { Component } from '@angular/core';
import {App, NavController, NavParams, ViewController} from 'ionic-angular';
import {ScheduleResultPage} from "../schedule-result/schedule-result";

@Component({
  selector: 'page-country-modal',
  templateUrl: 'country-modal.html',
})
export class CountryModalPage {
  Region: String;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountryModalPage');
    this.Region = this.navParams.get('region');
  }


closemodal() {
  this.viewCtrl.dismiss();
  }

 toSearchResult(){
   this.viewCtrl.dismiss();
   this.app.getRootNav().push(ScheduleResultPage);
 }


items = [
    'Country 1',
    'Country 2',
    'Country 3',
    'Country 4',
    'Country 5',
    'Country 6',
    'Country 7',
    'Country 8',
    'Country 9',
    'Country 0'
  ];

}
