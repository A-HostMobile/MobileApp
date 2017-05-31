import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {NgForm} from "@angular/forms";
import {LclBookingPage} from "../lcl-booking/lcl-booking";
import {CourierBookingPage} from "../courier-booking/courier-booking";

@IonicPage()
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
              public viewCtrl: ViewController
  ) {
    this.page = this.navParam.data;
  }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.userData.login(this.login.username);
      if(this.page == LclBookingPage||this.page == CourierBookingPage) {
        this.navCtrl.push(this.page).then(()=>{
          const index = this.viewCtrl.index;
          this.navCtrl.remove(index);
        });
      }
      else {
        this.navCtrl.popToRoot()
          .then(() => this.navCtrl.first().dismiss());
      }
    }
  }

  closemodal() {
    this.navCtrl.popToRoot()
      .then(() => this.navCtrl.first().dismiss());
  }

  ionViewDidLoad(){
    console.log(this.navParam.data);
  }

  username(): String {
    return this.login.username;
  }

}
