import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Network } from "@ionic-native/network";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { TemplateApp } from './app.component';

import { ContactPage } from "../pages/contact/contact";
import { ProfilePage } from "../pages/profile/profile";
import { NewsPage } from "../pages/news/news";
import { HelpPage } from "../pages/help/help";
import { HomePage } from "../pages/home/home";
import {LclBookingPage} from "../pages/lcl-booking/lcl-booking";
import {LoginPage} from "../pages/login-modal/login-modal";
import {ScheduleSearchPage} from "../pages/schedule-search/schedule-search";
import {ScheduleResultPage} from "../pages/schedule-result/schedule-result";
import {CourierBookingPage} from "../pages/courier-booking/courier-booking";
import {CourierBooking2Page} from "../pages/courier-booking2/courier-booking2";
import {AgentNetworkPage} from "../pages/agent-network/agent-network";
import {LclSummaryPage} from "../pages/lcl-summary/lcl-summary";
import {CourierItemModalPage} from "../pages/courier-item-modal/courier-item-modal";
import {CourierSummaryPage} from "../pages/courier-summary/courier-summary";
import {ContactMapModalPage} from "../pages/contact-map-modal/contact-map-modal";
import {ProfileEditPage} from "../pages/profile-edit/profile-edit";
import {CountryModalPage} from "../pages/country-modal/country-modal";
import {AddPickupModalPage} from "../pages/add-pickup-modal/add-pickup-modal";
import {CompletedPage} from "../pages/completed/completed";
import {DgPopupModalPage} from "../pages/dg-popup-modal/dg-popup-modal";
import {HistoryPage} from "../pages/history/history";
import {HistoryDetailPage} from "../pages/history-detail/history-detail";
import {HistoryDetailCourierPage} from "../pages/history-detail-courier/history-detail-courier";
import {NewsDetailPage} from "../pages/news-detail/news-detail";
import {NoInternetModalPage} from "../pages/no-internet-modal/no-internet-modal";
import {PickupAddressPage} from "../pages/pickup-address/pickup-address";
import {RegisterModalPage} from "../pages/register-modal/register-modal";

import {HowtoCourierPage} from "../pages/howto-courier/howto-courier";
import {HowtoHistoryPage} from "../pages/howto-history/howto-history";
import {HowtoLclPage} from "../pages/howto-lcl/howto-lcl";

import { AdvertisementProvider } from '../providers/advertisement/advertisement';
import { AgentNetworkServiceProvider } from '../providers/agent-network-service/agent-network-service';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { ContinentServiceProvider } from '../providers/continent-service/continent-service';



@NgModule({
  declarations: [
    TemplateApp,
    AddPickupModalPage,
    AgentNetworkPage,
    CompletedPage,
    ContactPage,
    ContactMapModalPage,
    CountryModalPage,
    CourierBookingPage,
    CourierBooking2Page,
    CourierItemModalPage,
    CourierSummaryPage,
    DgPopupModalPage,
    HelpPage,
    HistoryPage,
    HistoryDetailPage,
    HistoryDetailCourierPage,
    HomePage,
    LclBookingPage,
    LclSummaryPage,
    LoginPage,
    NewsPage,
    NewsDetailPage,
    NoInternetModalPage,
    PickupAddressPage,
    ProfilePage,
    ProfileEditPage,
    RegisterModalPage,
    ScheduleSearchPage,
    ScheduleResultPage,
    HowtoCourierPage,
    HowtoHistoryPage,
    HowtoLclPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(TemplateApp, {}, {
      links: [
        { component: HomePage, name: 'HomePage', segment: 'home' }
      ]
    }),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBPEEdhkhbFKC2cBu9uPIsK9DxcFqRf_WA'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TemplateApp,
    AddPickupModalPage,
    AgentNetworkPage,
    CompletedPage,
    ContactPage,
    ContactMapModalPage,
    CountryModalPage,
    CourierBookingPage,
    CourierBooking2Page,
    CourierItemModalPage,
    CourierSummaryPage,
    DgPopupModalPage,
    HelpPage,
    HistoryPage,
    HistoryDetailPage,
    HistoryDetailCourierPage,
    HomePage,
    LclBookingPage,
    LclSummaryPage,
    LoginPage,
    NewsPage,
    NewsDetailPage,
    NoInternetModalPage,
    PickupAddressPage,
    ProfilePage,
    ProfileEditPage,
    RegisterModalPage,
    ScheduleSearchPage,
    ScheduleResultPage,
    HowtoCourierPage,
    HowtoHistoryPage,
    HowtoLclPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    Network,
    AdvertisementProvider,
    AgentNetworkServiceProvider,
    ContinentServiceProvider
  ]
})
export class AppModule { }
