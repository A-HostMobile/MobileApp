import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController } from 'ionic-angular';
import { CountryModalPage } from "../country-modal/country-modal";

import { CountryModel } from '../../models/countries';
import { ContinentServiceProvider } from '../../providers/continent-service/continent-service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-schedule-search',
  templateUrl: 'schedule-search.html',
})
export class ScheduleSearchPage {

  continent: Array<CountryModel>;
  sub: Subscription;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public mdlCtrl: ModalController, public conService:ContinentServiceProvider) {
  }

  ionViewWillEnter(){
    this.getContinent();
    console.log(this.sub);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleSearchPage');
  }

  toCountry(region: any,city: any) {
    let countryModal = this.mdlCtrl.create(CountryModalPage,{region, city});
    countryModal.present();
  }

  private getContinent(){
      this.sub = this.conService.getContinent().subscribe(
        (res) => this.continent = res,
        (error) => this.errorMessage = <any> error
      );
  }

}
