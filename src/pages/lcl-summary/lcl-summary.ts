import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ModalController,LoadingController } from 'ionic-angular';
import {CompletedPage} from "../completed/completed";
import {LoginPage} from '../../pages/login-modal/login-modal';
import {ScheduleServiceProvider} from '../../providers/schedule-service/schedule-service';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
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
    public authService: AuthServiceProvider,
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
      //console.log("data 1 :"+JSON.stringify(this.lclFormData));
      this.scheduleData = this.navParams.get("secondPassed");
      //console.log("data 2 :"+JSON.stringify(this.scheduleData));
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
          console.log("Found Schedule Data :"+JSON.stringify(this.scheduleData));
      }
  }

  setSchedule(_resp:any){
      console.log("ress Data :"+JSON.stringify(_resp)),
      console.log("ress Data size :"+_resp.length);
      if(_resp.length != 0){
          this.scheduleData = _resp[0];
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LclSummaryPage');
  }

  toCompleted(){
    this.authService.getProfile().subscribe((res)=>{
      let profile = res;
      if(profile.responseCode == 3){
        this.userData.logout();
        console.log('logout from lcl summary: Get profile error');
        this.CheckPage();
      }else if(profile.responseCode == 1 || profile.responseCode == 2){
        this.userData.logout();
        console.log('logout from lcl summary: Have a problem from DB');
        this.CheckPage();
      }else{
        this.navCtrl.push(CompletedPage);
        console.log('login from lcl summary');
      }
    });
  }

  CheckPage(){
    let modal = this.mdlCtrl.create(LoginPage, LclSummaryPage);
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn === true) {
        console.log('login from lcl summary before open lcl summary page');
        return true;
      }
      else {
        console.log('fail before open lcl summary');
        this.navCtrl.pop();
        modal.present();
        return false;
      }
    });
  }

}
