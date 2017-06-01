import {Component, ViewChild} from '@angular/core';
import {ModalController, Nav, Navbar, NavController, NavParams, ViewController} from 'ionic-angular';
import {LclSummaryPage} from "../lcl-summary/lcl-summary";
import {ScheduleResultPage} from "../schedule-result/schedule-result";
import {LoginPage} from "../login-modal/login-modal";
import {UserData} from "../../providers/user-data";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-lcl-booking',
  templateUrl: 'lcl-booking.html',
})
export class LclBookingPage {
  @ViewChild(Navbar) navbar : Navbar;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public mdlCtrl: ModalController,
              public userData: UserData) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LclBookingPage');
    this.navbar.backButtonClick = (e:UIEvent)=> {
      let check = this.navParams.data;
      if(check == 1){
        this.navCtrl.push(ScheduleResultPage).then(()=>this.navCtrl.first().dismiss());
      }
      else{
        if (this.viewCtrl.index == 0) {
          this.navCtrl.popToRoot().then(() => {
            this.navCtrl.first().dismiss();
          });
        }
        else {
          this.navCtrl.popToRoot();
        }
      }
    }
  }

  ionViewCanEnter(){
    let modal = this.mdlCtrl.create(LoginPage, LclBookingPage);
    if(this.userData.hasLoggedIn().then((hasLoggedIn) => {
        if (hasLoggedIn === true) {
          return true;
        }
        else {
          this.navCtrl.popToRoot();
          modal.present();
          return false;
        }
      })){
    }
  }

  toSummary(){
    this.navCtrl.push(LclSummaryPage).then(()=>this.navCtrl.first().dismiss());
  }
}
