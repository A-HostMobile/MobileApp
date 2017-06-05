import {Component, ViewChild} from '@angular/core';
import {App, Navbar, NavParams, ViewController} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {NgForm} from "@angular/forms";
import {LclBookingPage} from "../lcl-booking/lcl-booking";
import {CourierBookingPage} from "../courier-booking/courier-booking";
import {ScheduleResultPage} from "../schedule-result/schedule-result";

@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginPage {
  @ViewChild(Navbar) navbar : Navbar;
  login: {username?: string, password?: string} = {};
  submitted = false;
  page : any;

  constructor(public userData: UserData,
              public navParam: NavParams,
              public viewCtrl: ViewController,
              public app: App,) {
    this.page = this.navParam.data;
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
        this.closemodal();
      }
    }
  }

  closemodal() {
    this.viewCtrl.dismiss();
    if(this.app.getRootNav().getActive().component!=ScheduleResultPage){
      this.app.getRootNav().popToRoot();
    }
  }

  username(): String {
    return this.login.username;
  }

}
