import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController } from 'ionic-angular';
import {CompletedPage} from "../completed/completed";
import {DgPopupModalPage} from "../dg-popup-modal/dg-popup-modal";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-courier-summary',
  templateUrl: 'courier-summary.html',
})
export class CourierSummaryPage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public mdlCtrl: ModalController,
      public authService: AuthServiceProvider,
      public userData: UserData
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierSummaryPage');
  }

  toComplete(){
    this.authService.getProfile().subscribe((res)=>{
      let profile = res;
      if(profile.responseCode == 3){
        this.userData.logout();
        alert('Please try to logIn again');
        console.log('logout from courier summary: Get profile error');
      }else if(profile.responseCode == 1 || profile.responseCode == 2){
        this.userData.logout();
        alert('Please try to logIn again');
        console.log('logout from courier summary: Have a problem from DB');
      }else{
        console.log('login from courier summary');
        this.userData.login(profile);
        this.navCtrl.push(CompletedPage);
      }
    });
  }

  dgModalShow() {
    let dgModal = this.mdlCtrl.create(DgPopupModalPage);
    dgModal.present();
  }

}
