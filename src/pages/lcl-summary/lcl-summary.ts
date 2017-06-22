import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ModalController, LoadingController, Events} from 'ionic-angular';
import {CompletedPage} from "../completed/completed";
import {ScheduleServiceProvider} from '../../providers/schedule-service/schedule-service';
import {BookingServiceProvider} from '../../providers/booking-service/booking-service';
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
  remarkData:string ="";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public scheduleService:ScheduleServiceProvider,
    public bookingService:BookingServiceProvider,
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
    let responseData:any;
    let checkRemark = this.prepareData(this.scheduleData);
    if(checkRemark){
        let numCommodity,numPackage,numGwunit:any = null;
        if(this.lclFormData.commodities!=null){
              numCommodity = this.lclFormData.commodities.qc_lookup_code;
        }
        if(this.lclFormData.package!=null){
              numPackage = this.lclFormData.package.qc_lookup_no;
        }
        if(this.lclFormData.gwunit!=null){
              numGwunit = this.lclFormData.gwunit.qc_lookup_no;
        }
        this.bookingService.insertBookingLCL(this.lclFormData,this.dateUnix,this.remarkData,numCommodity,numGwunit,numGwunit).subscribe(
            (resData) => {  responseData = resData,
                            this.events.publish('checkStsLogin',CompletedPage,
                               {
                               booking_id: responseData,
                               type:"LCL"
                            });
                        },
            (error) => {  this.errorMessage = <any> error}
          );
    }else{
        console.log('Prepare Schedule Data Error');
    }

    //
    console.log('login from lcl summary');
  }

  prepareData(schedule:any){

      if(schedule.s_carrier!=null){
          this.remarkData = this.remarkData+"CARRIER: "+schedule.s_carrier+",";
      }
      if(schedule.s_vessel!=null){
          this.remarkData = this.remarkData+"VESSEL: "+schedule.s_vessel+",";
      }
      if(schedule.s_voy!=null){
          this.remarkData = this.remarkData+"VOY: "+schedule.s_voy+",";
      }
      if(schedule.s_feeder!=null){
          this.remarkData = this.remarkData+"FEEDER: "+schedule.s_feeder+",";
      }
      if(schedule.s_fvoy!=null){
          this.remarkData = this.remarkData+"FVOY: "+schedule.s_fvoy+",";
      }
      if(schedule.s_closing_date!=null){
          this.remarkData = this.remarkData+"CLOSING_DATE: "+schedule.s_closing_date+",";
      }
      if(schedule.s_etd!=null){
          this.remarkData = this.remarkData+"ETD: "+schedule.s_etd+",";
      }
      if(schedule.s_eta!=null){
          this.remarkData = this.remarkData+"ETA: "+schedule.s_eta;
      }


    return true;
  }

}
