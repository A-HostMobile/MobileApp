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
  historyTab: string;
  isAndroid: boolean = false;
  before: any;

  LCLhistory: any;
  COURIERhistory: any;
  sub: Subscription;
  errorMessage: string;

  _LCLhistory:any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public events: Events,
              public historyService: HistoryServiceProvider
            ) {
    this.before = this.navParams.get('pages');
    if(this.before==CompletedPage){
      this.platform.ready().then(()=>{
        this.platform.registerBackButtonAction(()=>{
          this.navCtrl.popToRoot();
        })
      });
    }
    if(this.navParams.get('params')!=null){
      if(this.navParams.get('params')==1){
        this.historyTab = 'lcl';
      } else {
        this.historyTab = 'courier'
      }
    } else {
      this.historyTab = 'lcl';
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
    this.getLclCourier();
  }

  ionViewDidLeave(){
    if(this.before==CompletedPage){
      this.events.publish('backButton');
    }
  }

  private getLclCourier(){
    this.sub = this.historyService.getLclHistory().subscribe(
      (res) => {
        this.LCLhistory = res;
        this.historyService.getCourierHistory().subscribe(
          (res) => {
            this.COURIERhistory = res;
            this.events.publish('dismissLoading')
            //console.log(this.COURIERhistory);
          },
          (error) => {this.errorMessage = <any> error}
        );
      },
      (error) => {
        this.errorMessage = <any> error,
        this.events.publish('dismissLoading')
      },
    );
  }

  toLCL(lcl_id:any){
    this.navCtrl.push(HistoryDetailPage,lcl_id);
  }

  toCourier(courier_id:any){
    this.navCtrl.push(HistoryDetailCourierPage,courier_id);
  }

}
