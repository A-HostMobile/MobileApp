import { Component } from '@angular/core';
import {App, NavController, NavParams, ViewController} from 'ionic-angular';
import {ScheduleResultPage} from "../schedule-result/schedule-result";

import { ContinentServiceProvider } from '../../providers/continent-service/continent-service';
import { CountryModel } from '../../models/countries';

@Component({
  selector: 'page-country-modal',
  templateUrl: 'country-modal.html',
})
export class CountryModalPage {

  Region: String;
  Country: Array<CountryModel>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public app: App) {

        this.Region = this.navParams.get('region');
        this.Country = this.navParams.get('city');
  }

  ionViewDidLoad() {
    console.log(this.Country);
    console.log(this.Region);
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }

 toSearchResult(country: String){
   this.viewCtrl.dismiss();
   this.app.getRootNav().push(ScheduleResultPage,country);
 }

}
