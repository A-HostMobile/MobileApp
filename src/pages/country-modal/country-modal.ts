import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {ScheduleResultPage} from "../schedule-result/schedule-result";

@Component({
  selector: 'page-country-modal',
  templateUrl: 'country-modal.html',
})
export class CountryModalPage {
  Region: String;
  regname: String;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountryModalPage');
    this.Region = this.navParams.get('region');
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
