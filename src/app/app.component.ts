import { Component, ViewChild } from '@angular/core';
import {Network} from "@ionic-native/network";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from '@ionic-native/splash-screen';
import {App, Events, MenuController, ModalController, Nav, Platform, ToastController, LoadingController, AlertController} from 'ionic-angular';

import { FCM } from '@ionic-native/fcm';
import {HomePage} from "../pages/home/home";
import {HelpPage} from "../pages/help/help";
import {NewsPage} from "../pages/news/news";
import {ContactPage} from "../pages/contact/contact";
import {ProfilePage} from "../pages/profile/profile";
import {LoginPage} from "../pages/login-modal/login-modal";
import {CompletedPage} from "../pages/completed/completed";
import {LclBookingPage} from "../pages/lcl-booking/lcl-booking";
import {AgentNetworkPage} from "../pages/agent-network/agent-network";
import {PickupAddressPage} from "../pages/pickup-address/pickup-address";
import {HistoryDetailPage} from "../pages/history-detail/history-detail";
import {CourierBookingPage} from "../pages/courier-booking/courier-booking";
import {ScheduleSearchPage} from "../pages/schedule-search/schedule-search";
import {AddPickupModalPage} from "../pages/add-pickup-modal/add-pickup-modal";
import {NoInternetModalPage} from "../pages/no-internet-modal/no-internet-modal";
import {HistoryDetailCourierPage} from "../pages/history-detail-courier/history-detail-courier";

import { UserData } from '../providers/user-data';
import {QuickcodeProvider} from '../providers/quickcode/quickcode';
import {FcmServiceProvider} from '../providers/fcm-service/fcm-service';
import {AuthServiceProvider} from '../providers/auth-service/auth-service';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
}

@Component({
  templateUrl: 'app.template.html'
})
export class TemplateApp {

  @ViewChild(Nav)
  nav: Nav;

  count: number = 0;
  bpress: number = 0;
  rootPage: any = HomePage;
  _profile: any;
  _quickcode_pod:any;
  _quickcode_package:any;
  _quickcode_gwunit:any;
  _quickcode_countrycode:any;
  _quickcode_commodities:any;
  _loading: any;
  _alert:any;
  fcmInsertToken:any;
  fcmDeleteToken:any;
  errorMessage:string;

  appPages: PageInterface[] = [
    { title: 'Home', name: 'HomePage', component: HomePage, icon: 'ios-home' },
    { title: 'Schedule', name: 'ScheduleSearchPage', component: ScheduleSearchPage, icon: 'md-calendar' },
    { title: 'LCL Booking', name: 'LclBookingPage', component: LclBookingPage, icon: 'md-boat' },
    { title: 'Courier', name: 'CourierBookingPage', component: CourierBookingPage, icon: 'ios-cube' },
    { title: 'News & Promotion', name: 'NewsPage', component: NewsPage, icon: 'md-star' },
    { title: 'Agent Network', name: 'AgentNetworkPage', component: AgentNetworkPage, icon: 'md-globe' },
    { title: 'Contact Us', name: 'ContactPage', component: ContactPage, icon: 'ios-contact' },
    { title: 'Help', name: 'HelpPage', component: HelpPage, icon: 'md-help-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Profile', name: 'ProfilePage', component: ProfilePage, icon: 'md-person' },
    { title: 'Logout', name: 'Logout', component: HomePage, icon: 'ios-log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'ios-log-in' }
  ];

  constructor(
    public app: App,
    public fcm: FCM,
    public events: Events,
    public network: Network,
    public status: StatusBar,
    public userData: UserData,
    public platform: Platform,
    public menu: MenuController,
    public alert: AlertController,
    public mdlCtrl: ModalController,
    public toastCtrl: ToastController,
    public splashScreen: SplashScreen,
    public loadCtrl: LoadingController,
    public fcmService: FcmServiceProvider,
    public authService: AuthServiceProvider,
    public quickcodeService: QuickcodeProvider
  ) {

    this.platform.ready().then(() => {
        this.splashScreen.hide();
        this.checkConnection();
        this.userData.hasLoggedIn().then((hasLoggedIn) => {
          if(hasLoggedIn == true){
            let token = localStorage.getItem('token');
            if(token){
              this.events.publish('checkStsLogin','check');
              let profile = localStorage.getItem('profile');
              if(profile){
                this._profile = JSON.parse(profile);
              }
            }
            console.log('loggedIn')
          }else{
            console.log('Have not login')
            this.events.publish('user:logout');
          }
      });

      this.enableMenu(true);

      this.listenToEvents();

      this.backButton();

      this.quickcodeService.getPod().subscribe((resPod)=>{
          this._quickcode_pod = resPod;
      });
      this.quickcodeService.getPackage().subscribe((resPackage)=>{
          this._quickcode_package = resPackage;
      });
      this.quickcodeService.getGwunit().subscribe((resGwunit)=>{
          this._quickcode_gwunit = resGwunit;
      });
      this.quickcodeService.getCountrycode().subscribe((resCountry)=>{
          this._quickcode_countrycode = resCountry;
      });
      this.quickcodeService.getCommodities().subscribe((resCommodity)=>{
          this._quickcode_commodities = resCommodity;
      });

      if(this.platform.is('cordova')){

        console.log("Run App on Mobile");
        this.fcm.getToken().then(token=>{
          console.log("FCM TOKEN:"+token);
        })
        this.fcm.onNotification().subscribe(data=>{
          // console.log("On Notification Data:"+JSON.stringify(data));
          console.log(data.bookingId);
          let _page:any;
          //set page
          if(data.type == 1){
            _page = HistoryDetailPage
          }
          else{
            _page = HistoryDetailCourierPage
          }
          this.events.publish('checkStsLogin',_page,data.bookingId,data.wasTapped);
        });
        this.fcm.onTokenRefresh().subscribe(token=>{
          console.log('On Refresh: '+JSON.stringify(token));
          this.events.publish('FCMInsert',token);
        });
      }
      else{
        console.log("Run App on Browser");
      }
    });

  }

  listenToEvents() {
    this.events.subscribe('user:login', (profile:any) => {
      this._profile = profile;
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
    });

    this.events.subscribe('backButton',()=>{
      this.backButton();
    });

    this.events.subscribe('exit',()=>{
      this.exit();
    });

    this.events.subscribe('showLoading',()=>{
      this.showLoading();
    });

    this.events.subscribe('dismissLoading',()=>{
      this.dismissLoading();
    });

    this.events.subscribe('checkStsLogin',(pages:any,params:any,wasTapped:any)=>{
      if(pages!=null){
        this.checkStatusLogin(pages,params,wasTapped);
      }
    });

    this.events.subscribe('loadpage',()=>{
      this.LoadingPage();
    });

    this.events.subscribe('confirmBox',(_Id:any,_Index:any,_pages:any)=>{
      this.ConfirmBox(_Id,_Index,_pages);
    });

    this.events.subscribe('FCMInsert',(fcmToken:any)=>{
      this.InsertToken(fcmToken);
    });

    this.events.subscribe('FCMDelete',()=>{
      this.DeleteToken();
    });
  }

  InsertToken(FCMtoken:any){
    this.fcmService.FCMInsertTokenFn(FCMtoken).subscribe(
      (res) => this.fcmInsertToken = res,
      (error) => this.errorMessage = <any>error
    );
    console.log('InsertToken: '+FCMtoken);
  }

  DeleteToken(){
    console.log('delete token function test');
    this.fcmService.FCMDeleteTokenFn().subscribe(
      (res)=> this.fcmDeleteToken = res,
      (error)=> this.errorMessage = <any> error
    );
  }

  ConfirmBox(_Id:any,_Index:any,_pages:any){
      this._alert = this.alert.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this address?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
              console.log('cancel');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
              console.log('firm')
              if(_pages == 'PickupAddressPage'){
                  this.events.publish('deletePickup',_Id,null);
                  console.log('pickup page con')
              }else{
                  this.events.publish('deleteCourierItem',_Id,_Index);
                  console.log('courier page con')
              }
          }
        }
      ]
    });
    this._alert.present();
  }

  showLoading(): Promise<any>{
    this._loading = this.loadCtrl.create({
      content: "Please wait...",
      spinner: 'hide'
    })
    return this._loading.present();
  }

  LoadingPage(){
    let load = this.loadCtrl.create({
      content: "Please wait...",
      spinner: 'hide',
      duration: 350
    });
    load.present();
  }

  dismissLoading(): Promise<any>{
    return this._loading.dismiss();
  }

  exit() {
    let toast = this.toastCtrl.create({message:'Press back button again to exit',duration:2000,position: 'bottom'});
    toast.present();
    this.bpress++;
    setTimeout(()=>{
      this.bpress=0;
    },2000);
    if(this.bpress==2){
      this.platform.exitApp();
    }
  }

  backButton() {
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        let activeView = nav.getActive();
        let cp = nav.getActive().component;

        if (activeView != null){
          if(nav.canGoBack()) {
            if(cp==NewsPage||cp==AgentNetworkPage||cp==HelpPage||cp==ProfilePage||cp==ContactPage||cp==ScheduleSearchPage){
              nav.popToRoot();
            }else if (cp==CompletedPage) {

            }else {
              nav.pop();
            }
          } else if(activeView.instance instanceof HomePage){
            this.exit();
          } else {
            nav.pop();
          }
        }
      })
    })
  }

  checkStatusLogin(pages:any,params:any,wasTapped:any){
    this.authService.getProfile().subscribe((res)=>{
      let profile = res;
      if(profile.responseCode == 0){
        this.userData.login(profile);
        console.log('Login and Get profile');
        if(pages==HomePage){
          this.app.getRootNav().popToRoot();
        }else if(pages == HistoryDetailPage || pages == HistoryDetailCourierPage){
          //check wasTapped
          if(wasTapped){
            console.log('Run background was tapped');
            this.app.getRootNav().push(pages,params);
          }else{
            console.log('Run foreground');
            this.popupPushNoti(pages,params);
          }
        }else if(pages!='check'){
          this.app.getRootNav().push(pages,params);
        }
      }else{
        this.userData.logout();
        console.log('Logout Code: '+profile.responseCode);
        let nav = this.app.getActiveNav();
        let activeView = nav.getActive();
        if (pages == LclBookingPage || pages == CourierBookingPage || pages == HistoryDetailPage || pages == HistoryDetailCourierPage) {
          this.authService.OpenModal(pages, params);
        }
        else if(nav.canGoBack()) {
          if(activeView.instance instanceof AddPickupModalPage){
            this.alertToHomeAddPick();
          }
          else{
            this.alertToHome();
          }
        }
        else {
          this.alertToHomeModal();
        }
      }
    });
  }

  popupPushNoti(page:any,param:any){
      this._alert = this.alert.create({
        title: 'Booking ID: '+ param,
        message: 'Do you want to open '+ page + 'page?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
                console.log('cancel');
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.app.getRootNav().push(page,param);
            }
          }
        ]
      });
      this._alert.present();
  }

  checkConnection() {
    if(this.network.type === 'none'){
      if(this.platform.is('android')){
        this.alert.create({
          title: 'No Connection Access',
          message: 'Please Check Your Internet Connection',
          buttons:[{
            text: 'OK',
            handler: ()=>{
              this.platform.exitApp();
            }
          }]
        }).present();
      } else if(this.platform.is('ios')){
        this.alert.create({
          title: 'No Connection Access',
          message: 'Please exit this appliction and try again',
          enableBackdropDismiss : false
        }).present();
      }
    } else {
      this.network.onDisconnect().subscribe(()=> {
        this.mdlCtrl.create(NoInternetModalPage).present();
      });
    }
  }

  openPage(page: PageInterface) {

    if(page.component == HomePage){
      this.nav.popToRoot();
    }
    else if (page.component == LclBookingPage||page.component == CourierBookingPage){
      this.nav.popToRoot({animate:false});
      this.events.publish('loadpage');
      this.events.publish('checkStsLogin',page.component);
    }
    else if(page.component == LoginPage){
      this.authService.OpenModal(HomePage,null);
    }
    else{
      this.nav.push(page.component).then(()=>{
        this.nav.pop;
      });
    }
    if (page.logsOut === true) {
      this.userData.logout();
    }
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  isActive(page: PageInterface) {

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  alertToHome(){
    let alt = this.alert.create({
      title: 'Error',
      message: 'You are logged out from system because someone had logged in other device or password had been changed',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.nav.popToRoot();
          }
        }
      ]
    });
    alt.present();
  }

  alertToHomeAddPick(){
    let alt = this.alert.create({
      title: 'Error',
      message: 'You are logged out from system because someone had logged in other device or password had been changed',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.app.getActiveNav().pop();
            this.app.getActiveNav().pop();
            this.app.getRootNav().popToRoot();
          }
        }
      ]
    });
    alt.present();
  }

  alertToHomeModal(){
    let alt = this.alert.create({
      title: 'Error',
      message: 'You are logged out from system because someone had logged in other device or password had been changed',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.app.getActiveNav().pop();
            this.app.getRootNav().popToRoot();
          }
        }
      ]
    });
    alt.present();
  }

}
