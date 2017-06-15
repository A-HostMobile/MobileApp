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
import {HistoryPage} from "../pages/history/history";
import {CompletedPage} from "../pages/completed/completed";
import {StatusBar} from "@ionic-native/status-bar";
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

  @ViewChild(Nav) nav: Nav;

  count: number = 0;
  bpress: number = 0;
  rootPage: any = HomePage;
  _profile:any;

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
    public status: StatusBar,
    public userData: UserData,
    public platform: Platform,
    public menu: MenuController,
    public mdlCtrl: ModalController,
    public confData: ConferenceData,
    public splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    public authService: AuthServiceProvider
  ) {

    confData.load();

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.authService.SubscribeProfile();
      let token = localStorage.getItem('token');
      if(token){
        this.authService.SubscribeProfile();
        let profile = localStorage.getItem('profile');
          if (profile){
              this._profile = JSON.parse(profile);
          }
          this.enableMenu(hasLoggedIn === true);
      }else{
        this.userData.hasLoggedIn().then((hasLoggedIn)=>{
          console.log('login False')
          this.enableMenu(hasLoggedIn === false);
        });
      }

    });

    this.enableMenu(true);

    this.checkConnection();

    this.listenToEvents();

    this.backButton();

    this.status.hide();

  }

  statusLogin(){

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

  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  listenToEvents() {
    this.events.subscribe('user:login', (profile:any) => {
      this._profile = profile;
      // console.log(this._profile);
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

    this.events.subscribe('status',()=>{
      this.statusLogin();
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
      this.nav.popToRoot({animate:false});
      this.nav.push(page.component);
    }
    else if(page.component == LoginPage){
      modal.present();
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

}
