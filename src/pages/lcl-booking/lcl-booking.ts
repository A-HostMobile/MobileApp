import {Component, ViewChild} from '@angular/core';
import {ModalController, Navbar, NavController, NavParams, ViewController, Events} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operator/first';

import {LclSummaryPage} from "../lcl-summary/lcl-summary";
import {LoginPage} from "../login-modal/login-modal";
import {UserData} from "../../providers/user-data";
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {QuickcodeProvider} from '../../providers/quickcode/quickcode';
import {ScheduleServiceProvider} from '../../providers/schedule-service/schedule-service';



@Component({
  selector: 'page-lcl-booking',
  templateUrl: 'lcl-booking.html',
})

export class LclBookingPage {
  @ViewChild(Navbar) navbar : Navbar;
  pods: Array<any>;
  gwunits: Array<any>;
  packages: Array<any>;
  commodities: Array<any>;
  scheduleData:any;
  errorMessage: string;
  datecancel:boolean = false;
  selectcancel:boolean = false;
  minDate:string;
  maxDate:any;

  lcl:{pod?:string,loadDate?:string,volume?:string,gw?:string,gwunit?:string,commodities?:string,detail?:string,quantity?:string,package?:string} = {pod:null,gwunit:null,commodities:null,package:null};

  submitted = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public mdlCtrl: ModalController,
              public userData: UserData,
              public authService: AuthServiceProvider,
              public quickcodeService :QuickcodeProvider,
              public events: Events,
              public scheduleService:ScheduleServiceProvider,
            ) {

      this.scheduleData = this.navParams.data;
      if(Object.keys(this.scheduleData).length != 0){
          this.maxDate = new Date(this.scheduleData.s_closing_date);
      }
      
      this.quickcodeService.getPod().subscribe(
        (resPod) => this.pods = resPod.responseData,
        (error) => {  this.errorMessage = <any> error});
      this.quickcodeService.getGwunit().subscribe(
        (resGwunit) => this.gwunits = resGwunit.responseData,
        (error) => {  this.errorMessage = <any> error});
      this.quickcodeService.getPackage().subscribe(
        (resPackage) => this.packages = resPackage.responseData,
        (error) => {  this.errorMessage = <any> error});
      this.quickcodeService.getCommodities().subscribe(
        (resCommodity) => this.commodities = resCommodity.responseData,
        (error) => {  this.errorMessage = <any> error});

  }

  toSummary(form: NgForm){
    this.submitted = true;
    if(form.valid){
      this.events.publish('checkStsLogin',LclSummaryPage,
        {
          firstPassed: form.value,
          secondPassed: this.scheduleData
        });
    } else {
      console.log('You shall not PASS!!!');
    }
  }

  touch(num: number){
    if(num == 1){
      this.selectcancel = true;
     } else {
      this.datecancel = true;
      console.log('You shall not PASS!!!');
     }
   }
}
