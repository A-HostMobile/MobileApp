import {Component, ViewChild} from '@angular/core';
import {ModalController, Navbar, NavController, NavParams, ViewController, Events} from 'ionic-angular';
import {LclSummaryPage} from "../lcl-summary/lcl-summary";
import {LoginPage} from "../login-modal/login-modal";
import {UserData} from "../../providers/user-data";
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {QuickcodeProvider} from '../../providers/quickcode/quickcode';

import {NgForm} from "@angular/forms";

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
  check: any;

  lcl:{pod?:string,loadDate?:string,volume?:string,gw?:string,gwunit?:string,commodities?:string,detail?:string,quantity?:string,package?:string} = {pod:null,gwunit:null,commodities:null,package:null};

  submitted = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public mdlCtrl: ModalController,
              public userData: UserData,
              public authService: AuthServiceProvider,
              public quickcodeService :QuickcodeProvider,
              public events: Events
            ) {

      this.scheduleData = this.navParams.data;
      //console.log("schedule Data:"+JSON.stringify(this.scheduleData));
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

  ionViewCanEnter(){
    this.check = this.events.publish('checkStsLogin');
  }

  CheckPage(form: NgForm){
    if(this.check){
      console.log('loggedIn on lcl page');
      this.toSummary(form);
    }else{
      this.navCtrl.pop();
    }
  }

  toSummary(form: NgForm){
    this.submitted = true;
    if(form.valid){
      console.log(JSON.stringify(form.value));
      this.navCtrl.push(LclSummaryPage,
      {
        firstPassed: form.value,
        secondPassed: this.scheduleData
      });
    } else {
      console.log('NOOO!!');
    }
  }
}
