import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ModalController, LoadingController, Events} from 'ionic-angular';
import {CompletedPage} from "../completed/completed";
import {ScheduleServiceProvider} from '../../providers/schedule-service/schedule-service';
import {UserData} from '../../providers/user-data';

@Component({
  selector: 'page-lcl-summary',
  templateUrl: 'lcl-summary.html',
})
export class LclSummaryPage {
  @ViewChild(Navbar) navbar:Navbar;
  lclFormData:any;
  scheduleData:any;
  errorMessage:string;
  dateUnix:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public scheduleService:ScheduleServiceProvider,
    public userData: UserData,
    public loadingCtrl: LoadingController,
    public mdlCtrl: ModalController
  ) {
      let loadingPopup = this.loadingCtrl.create({
        content: 'Loading data...'
      });
      this.lclFormData = this.navParams.get("firstPassed");
      this.dateUnix = Date.parse(this.lclFormData.loadDate)/1000;
      this.scheduleData = this.navParams.get("secondPassed");
      if(Object.keys(this.scheduleData).length == 0){
          loadingPopup.present();
          let resp:any;
          this.scheduleService.getSchedulesAuto(this.lclFormData.pod,this.dateUnix).subscribe(
            (resData) => { resp = resData,
                           this.setSchedule(resp),
                           loadingPopup.dismiss()
                         },
            (error) => {  this.errorMessage = <any> error}
          );
      }
  }

  setSchedule(_resp:any){
      if(_resp.length != 0){
          this.scheduleData = _resp[0];
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LclSummaryPage');
  }

  toCompleted(){
    // this.navCtrl.push(CompletedPage);
    this.events.publish('checkStsLogin',CompletedPage);
    console.log('login from lcl summary');
  }

}
