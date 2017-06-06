import {Component, ViewChild} from '@angular/core';
import {Events, Navbar, NavController, NavParams, Platform} from 'ionic-angular';
import {HistoryDetailPage} from "../history-detail/history-detail";
import {HistoryDetailCourierPage} from "../history-detail-courier/history-detail-courier";
import {CompletedPage} from "../completed/completed";


@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  @ViewChild(Navbar) navbar:Navbar;
  historyTab: string = "lcl";
  isAndroid: boolean = false;
  before: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public events: Events) {
    this.before = this.navParams.data;
    if(this.before==CompletedPage){
      this.platform.ready().then(()=>{
        this.platform.registerBackButtonAction(()=>{
          this.navCtrl.popToRoot();
        })
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    if(this.before==CompletedPage){
      this.navbar.backButtonClick = (e:UIEvent)=>{
        this.navCtrl.popToRoot();
      }
    }
  }

  ionViewDidLeave(){
    if(this.before==CompletedPage){
      this.events.publish('backButton');
    }
  }

  toLCL(){
    this.navCtrl.push(HistoryDetailPage);
  }

  toCourier(){
    this.navCtrl.push(HistoryDetailCourierPage);
  }

}
