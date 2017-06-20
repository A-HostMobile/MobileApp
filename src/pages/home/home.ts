
import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ModalController, ViewController, Platform, Nav, MenuController, LoadingController, Events} from 'ionic-angular';

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
  check:any;

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
              public advertisementProvider:AdvertisementProvider,
              public events: Events
            ) {
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
  openPage(pageNb: number) {

    let  view: any;
    let  page: any;

    if(pageNb == 1){ page = LclBookingPage; }
    else { page = CourierBookingPage; }

    let modal = this.mdlCtrl.create(LoginPage, {page:page});
    this.userData.hasLoggedIn().then((hasLoggedIn) => {

        if (hasLoggedIn === true) {
          this.navCtrl.push(page);
        }
        else { modal.present(); }
    });
  }
}
