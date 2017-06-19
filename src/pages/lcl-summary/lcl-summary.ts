import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ModalController} from 'ionic-angular';
import {CompletedPage} from "../completed/completed";
import {LoginPage} from '../../pages/login-modal/login-modal';

import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {UserData} from '../../providers/user-data';

@Component({
  selector: 'page-lcl-summary',
  templateUrl: 'lcl-summary.html',
})
export class LclSummaryPage {
  @ViewChild(Navbar) navbar:Navbar;
  lclFormData:any;
  scheduleData:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public userData: UserData,
    public mdlCtrl: ModalController
  ) {
      this.lclFormData = this.navParams.get("firstPassed");
      this.scheduleData = this.navParams.get("secondPassed");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LclSummaryPage');
  }

  toCompleted(){
    this.authService.getProfile().subscribe((res)=>{
      let profile = res;
      if(profile.responseCode == 3){
        this.userData.logout();
        console.log('logout from lcl summary: Get profile error');
        this.CheckPage();
      }else if(profile.responseCode == 1 || profile.responseCode == 2){
        this.userData.logout();
        console.log('logout from lcl summary: Have a problem from DB');
        this.CheckPage();
      }else{
        this.navCtrl.push(CompletedPage);
        console.log('login from lcl summary');
      }
    });
  }

  CheckPage(){
    let modal = this.mdlCtrl.create(LoginPage, LclSummaryPage);
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn === true) {
        console.log('login from lcl summary before open lcl summary page');
        return true;
      }
      else {
        console.log('fail before open lcl summary');
        this.navCtrl.pop();
        modal.present();
        return false;
      }
    });
  }

}
