import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ScheduleResultPage} from "../schedule-result/schedule-result";
/**
 * Generated class for the CountryModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-country-modal',
  templateUrl: 'country-modal.html',
})
export class CountryModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountryModalPage');
  }

closemodal() {
    this.navCtrl.popToRoot()
      .then(() => this.navCtrl.first().dismiss());
  }

 toSearchResult(){
   this.navCtrl.push(ScheduleResultPage)
   .then(() => this.navCtrl.first().dismiss());
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
