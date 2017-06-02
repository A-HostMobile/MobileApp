import {Component, ViewChild} from '@angular/core';
import {App, Navbar, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {NgForm} from "@angular/forms";
import {LclBookingPage} from "../lcl-booking/lcl-booking";
import {CourierBookingPage} from "../courier-booking/courier-booking";

@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginPage {
  @ViewChild(Navbar) navbar : Navbar;
  login: {username?: string, password?: string} = {};
  submitted = false;
  page : any;

  constructor(public navCtrl: NavController,
              public userData: UserData,
              public navParam: NavParams,
              public viewCtrl: ViewController,
              public app: App,
              public platform: Platform) {
    this.page = this.navParam.data;
    this.platform.ready().then(()=> {
      this.platform.registerBackButtonAction(() => {
        this.viewCtrl.dismiss();
      })
    })
  }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.userData.login(this.login.username);
      if(this.page == LclBookingPage||this.page == CourierBookingPage) {
        this.viewCtrl.dismiss();
        this.app.getRootNav().push(this.page);
      }
      else {
        this.viewCtrl.dismiss();
        this.app.getRootNav().popToRoot();
      }
    }
  }

  closemodal() {
    this.viewCtrl.dismiss();
    this.app.getRootNav().popToRoot();
  }

  ionViewDidLoad(){
    console.log(this.navParam.data);
  }

  username(): String {
    return this.login.username;
  }

}
