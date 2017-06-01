import { Component } from '@angular/core';
import {  NavController, NavParams ,ModalController} from 'ionic-angular';
import {CountryModalPage} from "../country-modal/country-modal";

@Component({
  selector: 'page-schedule-search',
  templateUrl: 'schedule-search.html',
})
export class ScheduleSearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public mdlCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleSearchPage');
  }

toCountry() {
    let countryModal = this.mdlCtrl.create(CountryModalPage);
    countryModal.present();
  }


}
