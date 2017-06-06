import { Component } from '@angular/core';
import { NavController, NavParams ,Platform  } from 'ionic-angular';
import {HowtoCourierPage} from "../howto-courier/howto-courier";
import {HowtoHistoryPage} from "../howto-history/howto-history";
import {HowtoLclPage} from "../howto-lcl/howto-lcl";

@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public plt: Platform) {
    // Check platform
    // if (this.plt.is('ios')) {
    //   console.log("I'm an iOS device!");
    // }
    //   else if (this.plt.is('android')){
    //     console.log("I'm android Device!");
    //   }
    //   else {
    //     console.log("I'm another Device!");
    //   }
   

  }

   


  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  toCourierHelp(){
    this.navCtrl.push(HowtoCourierPage);
  }

  toLclHelp(){
    this.navCtrl.push(HowtoLclPage);
  }

  toHistoryHelp(){
    this.navCtrl.push(HowtoHistoryPage);
  }

}
