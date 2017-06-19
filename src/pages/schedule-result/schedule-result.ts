import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { LclBookingPage } from "../lcl-booking/lcl-booking";

import { ScheduleServiceProvider } from '../../providers/schedule-service/schedule-service';
import { ScheduleModel } from '../../models/schedule';
import { Subscription } from 'rxjs/Subscription';
import { UserData } from '../../providers/user-data';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-schedule-result',
  templateUrl: 'schedule-result.html',
})
export class ScheduleResultPage {

  cname: string;

  schedule: Array<ScheduleModel>;
  sub: Subscription;
  errorMessage:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public scheduleService:ScheduleServiceProvider,
    public loadCtrl:LoadingController,
    public userData: UserData,
    public authService: AuthServiceProvider
  ) {
    this.cname = this.navParams.data;
}

  ionViewWillEnter(){
    this.getSchedule();
  }

  // ionViewDidEnter(){
  //   console.log('test '+this.schedule);
  //   console.log(JSON.stringify(this.schedule));
  // }
  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ScheduleResultPage');
  // }

  toLCLBooking(schData:Array<ScheduleModel>){
    this.authService.getProfile().subscribe((res)=>{
      let profile = res;
      if(profile.responseCode == 3){
        this.userData.logout();
        alert('Please try to logIn again');
        console.log('logout from schedule result : Get profile error');
      }else if(profile.responseCode == 1 || profile.responseCode == 2){
        this.userData.logout();
        console.log('logout from schedule result: Have a problem from DB');
        alert('Please try to logIn again');
      }else{
        console.log('login from schedule result');
        this.userData.login(profile);
        this.navCtrl.push(LclBookingPage,schData);
      }
    });
  }

  private getSchedule(){
      let loading = this.loadCtrl.create({
        content: "Please wait...",
        spinner: 'hide'
      });
      loading.present();

      this.sub = this.scheduleService.getSchedules(this.cname).subscribe(
        (res) => this.schedule = res,
        (error) => {  this.errorMessage = <any> error,
                      loading.dismiss() },
                () => loading.dismiss()
      );
  }

}
