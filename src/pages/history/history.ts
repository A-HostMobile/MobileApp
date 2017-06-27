import {Component, ViewChild} from '@angular/core';
import {Events, Navbar, NavController, NavParams, Platform} from 'ionic-angular';
import {HistoryDetailPage} from "../history-detail/history-detail";
import {HistoryDetailCourierPage} from "../history-detail-courier/history-detail-courier";
import {CompletedPage} from "../completed/completed";
import { Subscription } from 'rxjs/Subscription';
import { HistoryServiceProvider } from '../../providers/history-service/history-service';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  @ViewChild(Navbar) navbar:Navbar;
  historyTab: string = "lcl";
  isAndroid: boolean = false;
  before: any;

  LCLhistory: any;
  COURIERhistory: any;
  sub: Subscription;
  errorMessage: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public events: Events,
              public historyService: HistoryServiceProvider
            ) {
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

  ionViewWillEnter(){
    this.getLcl();
    this.getCourier();
  }

  ionViewDidLeave(){
    if(this.before==CompletedPage){
      this.events.publish('backButton');
    }
  }

  private getLcl(){
    this.sub = this.historyService.getLclHistory().subscribe(
      (res) => {
        this.LCLhistory = res;
        //console.log(this.LCLhistory);
      },
      (error) => {this.errorMessage = <any> error}
    );
  }

  private getCourier(){
    this.sub = this.historyService.getCourierHistory().subscribe(
      (res) => {
        this.COURIERhistory = res;
        //console.log(this.COURIERhistory);
      },
      (error) => {this.errorMessage = <any> error}
    );
  }

  toLCL(lcl_id:any){
    this.navCtrl.push(HistoryDetailPage,lcl_id);
  }

  toCourier(courier_id:any){
    this.navCtrl.push(HistoryDetailCourierPage,courier_id);
  }

}
