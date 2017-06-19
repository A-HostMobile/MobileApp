import {Component, ViewChild} from '@angular/core';
import {ModalController, Navbar, NavController, NavParams, ViewController} from 'ionic-angular';
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
  
  lcl:{pod?:string,loadDate?:string,volume?:string,gw?:string,gwunit?:string,commodities?:string,detail?:string,quantity?:string,package?:string} = {pod:null,gwunit:null,commodities:null,package:null};
  //lcl:{pod:string,myDate:string,volume:string,gw:string,gwunit:string,commodity:string,adetail:string,quantity:string,qtype:string};
  submitted = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public mdlCtrl: ModalController,
              public userData: UserData,
              public authService: AuthServiceProvider,
              public quickcodeService :QuickcodeProvider
            ) {

      this.scheduleData = this.navParams.data;
      console.log("schedule Data:"+JSON.stringify(this.scheduleData));
      this.quickcodeService.getPod().subscribe(
        (res) => this.pods = res.responseData,
        (error) => {  this.errorMessage = <any> error});
      this.quickcodeService.getGwunit().subscribe(
        (res) => this.gwunits = res.responseData,
        (error) => {  this.errorMessage = <any> error});
      this.quickcodeService.getPackage().subscribe(
        (res) => this.packages = res.responseData,
        (error) => {  this.errorMessage = <any> error});
      this.quickcodeService.getCommodities().subscribe(
        (res) => this.commodities = res.responseData,
        (error) => {  this.errorMessage = <any> error});

  }

  ionViewCanEnter(){
      this.CheckPage();
  }

  CheckSts(form: NgForm){
      console.log("Form Data :"+JSON.stringify(form.value));
    
    // this.authService.getProfile().subscribe((res)=>{
    //   let profile = res;
    //   if(profile.responseCode == 3){
    //     this.userData.logout();
    //     console.log('logout from lcl booking: Get profile error');
    //     this.CheckPage();
    //   }else if(profile.responseCode == 1 || profile.responseCode == 2){
    //     this.userData.logout();
    //     console.log('logout from lcl booking: Have a problem from DB');
    //     this.CheckPage();
    //   }else{
    //     this.toSummary(form);
    //     console.log('loggedIn from lcl booking');
    //   }
    // });
  }

  CheckPage(){
    let modal = this.mdlCtrl.create(LoginPage, LclBookingPage);
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn === true) {
        console.log('login from lcl before open lcl page');
        return true;
      }
      else {
        console.log('fail before open lcl');
        this.navCtrl.pop();
        modal.present();
        return false;
      }
    });
  }

  toSummary(form: NgForm){
    this.submitted = true;
    if(form.valid){
      console.log(this.lcl);
      this.navCtrl.push(LclSummaryPage,this.lcl);
    } else {
      console.log('NOOO!!');
    }
  }
}
