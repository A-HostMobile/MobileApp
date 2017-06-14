import { Component } from '@angular/core';
import { NavController, NavParams , ModalController, LoadingController } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mdlCtrl: ModalController,
    public conService:ContinentServiceProvider,
    public loadCtrl:LoadingController
  ) {
  }

  ionViewWillEnter(){
    this.getContinent();
  }

  ionViewDidLoad() {}

  toCountry(region: any,city: any) {
    let countryModal = this.mdlCtrl.create(CountryModalPage,{region, city});
    countryModal.present();
  }

  private getContinent(){
    let loading = this.loadCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loading.present();

      this.sub = this.conService.getContinent().subscribe(
        (res) => this.continent = res,
        (error) => {  this.errorMessage = <any> error,
                      loading.dismiss() },
                () => loading.dismiss()
      );
  }

}
