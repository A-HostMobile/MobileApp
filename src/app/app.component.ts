import { Component, ViewChild } from '@angular/core';

import {Events, MenuController, ModalController, Nav, Platform} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import {HomePage} from "../pages/home/home";
import {HelpPage} from "../pages/help/help";
import {ContactPage} from "../pages/contact/contact";
import {ProfilePage} from "../pages/profile/profile";
import {NewsPage} from "../pages/news/news";
import {ScheduleSearchPage} from "../pages/schedule-search/schedule-search";
import {LclBookingPage} from "../pages/lcl-booking/lcl-booking";
import {CourierBookingPage} from "../pages/courier-booking/courier-booking";
import {LoginPage} from "../pages/login-modal/login-modal";
import {AgentNetworkPage} from "../pages/agent-network/agent-network";
import {Network} from "@ionic-native/network";
import {NoInternetModalPage} from "../pages/no-internet-modal/no-internet-modal";


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class TemplateApp {

  @ViewChild(Nav) nav: Nav;
  usn: any;
  count:number = 0;
  appPages: PageInterface[] = [
    { title: 'Home', name: 'HomePage', component: HomePage, icon: 'ios-home' },
    { title: 'Schedule', name: 'SchedulePage', component: ScheduleSearchPage, icon: 'md-calendar' },
    { title: 'LCL Booking', name: 'BookingPage', component: LclBookingPage, icon: 'md-boat' },
    { title: 'Courier', name: 'CourierPage', component: CourierBookingPage, icon: 'ios-cube' },
    { title: 'News & Promotion', name: 'NewsPage', component: NewsPage, icon: 'md-star' },
    { title: 'Agent Network', name: 'NetworkPage', component: AgentNetworkPage, icon: 'md-globe' },
    { title: 'Contact US', name: 'ContactPage', component: ContactPage, icon: 'ios-contact' },
    { title: 'Help', name: 'HelpPage', component: HelpPage, icon: 'md-help-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Profile', name: 'ProfilePage', component: ProfilePage, icon: 'md-person' },
    { title: 'Logout', name: 'Logout', component: HomePage, icon: 'ios-log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'ios-log-in' }
  ];
  rootPage: any = HomePage;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public splashScreen: SplashScreen,
    public mdlCtrl: ModalController,
    public network: Network
  ) {

    confData.load();

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
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
    let modal = this.mdlCtrl.create(LoginPage, page.component);
    if(page.component == HomePage){
      this.nav.popToRoot();
    }
    else if (page.component == LclBookingPage||page.component == CourierBookingPage){
      if(this.userData.hasLoggedIn().then((hasLoggedIn) => {
        if(hasLoggedIn === true){
          this.nav.push(page.component);
        }
        else {
          this.nav.popToRoot();
          modal.present();
        }
      })){
      }
      else {
        this.nav.push(page.component, page.component);
      }
    }
    else if(page.component == LoginPage){
      this.nav.popToRoot();
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

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

}
