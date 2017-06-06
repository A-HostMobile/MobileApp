import { Component, ViewChild } from '@angular/core';
import {Network} from "@ionic-native/network";
import { SplashScreen } from '@ionic-native/splash-screen';
import {App, Events, MenuController, ModalController, Nav, Platform, ToastController} from 'ionic-angular';

import { UserData } from '../providers/user-data';
import { ConferenceData } from '../providers/conference-data';

import {HomePage} from "../pages/home/home";
import {HelpPage} from "../pages/help/help";
import {NewsPage} from "../pages/news/news";
import {ContactPage} from "../pages/contact/contact";
import {ProfilePage} from "../pages/profile/profile";
import {LoginPage} from "../pages/login-modal/login-modal";
import {LclBookingPage} from "../pages/lcl-booking/lcl-booking";
import {AgentNetworkPage} from "../pages/agent-network/agent-network";
import {CourierBookingPage} from "../pages/courier-booking/courier-booking";
import {ScheduleSearchPage} from "../pages/schedule-search/schedule-search";
import {NoInternetModalPage} from "../pages/no-internet-modal/no-internet-modal";


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

  @ViewChild(Nav) nav: Nav;

  count: number = 0;
  bpress: number = 0;
  rootPage: any = HomePage;

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
    public events: Events,
    public network: Network,
    public userData: UserData,
    public platform: Platform,
    public menu: MenuController,
    public mdlCtrl: ModalController,
    public confData: ConferenceData,
    public splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController) {

    confData.load();

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });

    this.enableMenu(true);

    this.checkConnection();

    this.listenToEvents();

    this.backButton();

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


  ionViewDidEnter(){
    this.menuCtrl.swipeEnable(false,'loggedOutMenu');
    this.menuCtrl.swipeEnable(false,'loggedInMenu');
  }

  backButton() {
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        let activeView = nav.getActive();

        if (activeView != null){
          if(nav.canGoBack()) {
            nav.pop();
          } else if(activeView.instance instanceof HomePage){
            this.exit();
          } else {
            nav.pop();
          }
        }
      })
    })
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  listenToEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });

    this.events.subscribe('backButton',()=>{
      this.backButton();
    });

    this.events.subscribe('exit',()=>{
      this.exit();
    });
  }

  checkConnection() {
    let discon = this.network.onDisconnect().subscribe(()=> {
      if(this.count==0){
        this.mdlCtrl.create(NoInternetModalPage).present();
        this.count++;
      }
    });
    this.network.onConnect().subscribe(()=>{
      this.network.onDisconnect().subscribe(()=> {
        this.mdlCtrl.create(NoInternetModalPage).present();
        discon.unsubscribe();
      });
    });
  }

  openPage(page: PageInterface) {
    let modal =  this.mdlCtrl.create(LoginPage,page.component);
    if(page.component == HomePage){
      this.nav.popToRoot();
    }
    else if (page.component == LclBookingPage||page.component == CourierBookingPage){
      this.nav.push(page.component);
    }
    else if(page.component == LoginPage){
      modal.present();
    }
    else{
      this.nav.push(page.component).catch((err: any)=>{
        console.log('push error');
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

}
