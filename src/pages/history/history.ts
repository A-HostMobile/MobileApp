import {Component, ViewChild} from '@angular/core';
import {Events, Navbar, NavController, NavParams, Platform} from 'ionic-angular';
import {HistoryDetailPage} from "../history-detail/history-detail";
import {HistoryDetailCourierPage} from "../history-detail-courier/history-detail-courier";
import {CompletedPage} from "../completed/completed";
import {HistoryModel} from '../../models/history';
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

  history: Array<HistoryModel>;
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
  }

  ionViewDidLeave(){
    if(this.before==CompletedPage){
      this.events.publish('backButton');
    }
  }

  private getLcl(){
    this.sub = this.historyService.getLclHistory().subscribe(
      (res) => {this.history = res; console.log(res);},
      (error) => {this.errorMessage = <any> error}
    );
  }

  toLCL(lcl_id:number){
    this.navCtrl.push(HistoryDetailPage,lcl_id);
  }

  toCourier(){
    this.navCtrl.push(HistoryDetailCourierPage);
  }

}
