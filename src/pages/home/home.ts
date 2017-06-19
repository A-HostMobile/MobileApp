
import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ModalController, ViewController, Platform, Nav, MenuController, LoadingController} from 'ionic-angular';

import {UserData} from "../../providers/user-data";
import {LclBookingPage} from "../lcl-booking/lcl-booking";
import {CourierBookingPage} from "../courier-booking/courier-booking";
import {LoginPage} from "../login-modal/login-modal";
import {AdvertisementProvider} from "../../providers/advertisement/advertisement"
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  bpress: number = 0;
  advertisementHome:any;
  errorMessage:string;

  @ViewChild(Nav) nav:Nav;
  constructor(public platform: Platform,
              public userData: UserData,
              public navParams: NavParams,
              public navCtrl: NavController,
              public mdlCtrl: ModalController,
              public viewCtrl: ViewController,
              public menuCtrl: MenuController,
              public authService: AuthServiceProvider,
              public loadingCtrl: LoadingController,
              public advertisementProvider:AdvertisementProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.advertisementProvider.getHomeAdvertisement().subscribe(
        (res)=> this.advertisementHome = res
        ,(error)=> this.errorMessage = <any>error);
    this.menuCtrl.swipeEnable(false,'loggedOutMenu');
    this.menuCtrl.swipeEnable(false,'loggedInMenu');
  }

  convertImg(img:string,type:string){
      return "data:"+type+";base64,"+img;
  }

  clickImg(index:string){
      console.log("Index :"+index);
  }

  CheckSts(page: number){
    this.authService.getProfile().subscribe((res)=>{
      let profile = res;
      console.log(profile);
      if(profile.responseCode == 3){
        console.log('logout from home: Get profile error');
        this.userData.logout();
        this.openPage(page);
      }else if(profile.responseCode == 1 || profile.responseCode == 2){
        console.log('logout from home: Error from DB');
        this.userData.logout();
        this.openPage(page);
      }else{
        console.log('login from home')
        this.userData.login(profile);
        this.openPage(page);
      }
    });
  }

  openPage(pageNb: number) {

    let  view: any;

    if(pageNb == 1){ view = LclBookingPage; }
    else { view = CourierBookingPage; }

    let modal = this.mdlCtrl.create(LoginPage, view);
    this.userData.hasLoggedIn().then((hasLoggedIn) => {

        if (hasLoggedIn === true) {
          this.navCtrl.push(view);
        }
        else { modal.present(); }
    });
  }
}
