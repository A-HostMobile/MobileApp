import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController } from 'ionic-angular';
import {CourierItemModalPage} from "../courier-item-modal/courier-item-modal";
import {CourierSummaryPage} from "../courier-summary/courier-summary";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-courier-booking2',
  templateUrl: 'courier-booking2.html',
})
export class CourierBooking2Page {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mdlCtrl: ModalController,
    public authService: AuthServiceProvider,
    public userData: UserData
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierBooking2Page');
  }

  toEditMasterDetail(){
    this.navCtrl.pop();
  }

  toManageItem(status: String) {
    let manageItem = this.mdlCtrl.create(CourierItemModalPage,{status});
    manageItem.present();
  }

  toSummary(){
    this.authService.getProfile().subscribe((res)=>{
      let profile = res;
      if(profile.responseCode == 3){
        this.userData.logout();
        console.log('logout from courier-booking2: Get profile error');
        alert('Please try to logIn again');
      }else if(profile.responseCode == 1 || profile.responseCode == 2){
        this.userData.logout();
        console.log('logout from courier-booking2: Have a problem from DB');
        alert('Please try to logIn again');
      }else{
        console.log('login from courier page 2')
        this.userData.login(profile);
        this.navCtrl.push(CourierSummaryPage);
      }
    });
  }

}
