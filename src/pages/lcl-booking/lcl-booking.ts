import {Component, ViewChild} from '@angular/core';
import {ModalController, Navbar, NavController, NavParams, ViewController} from 'ionic-angular';
import {LclSummaryPage} from "../lcl-summary/lcl-summary";
import {LoginPage} from "../login-modal/login-modal";
import {UserData} from "../../providers/user-data";
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

import {NgForm} from "@angular/forms";

export interface value{
  va:string;name:string;
}
@Component({
  selector: 'page-lcl-booking',
  templateUrl: 'lcl-booking.html',
})
export class LclBookingPage {
  @ViewChild(Navbar) navbar : Navbar;
  pods:value[]=[{va:'TH',name:'Thailand'},
    {va:'HK',name:'Hongkong'},
    {va:'JP',name:'Japan'}];
  gtypes:value[]=[{va:'ton',name:'TON'},{va:'kg',name:'KG'}];
  lcl:{pod?:string,myDate?:string,volume?:string,gw?:string,gtype?:string,commodity?:string,adetail?:string,quantity?:string,qtype?:string} = {pod:'TH',gtype:'ton',commodity:'ct',qtype:'ea'};
  submitted = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public mdlCtrl: ModalController,
              public userData: UserData,
              public authService: AuthServiceProvider
            ) {

  }

  ionViewCanEnter(){
      this.CheckPage();
  }

  CheckSts(form: NgForm){
    this.authService.getProfile().subscribe((res)=>{
      let profile = res;
      if(profile.responseCode == 3){
        this.userData.logout();
        console.log('logout from lcl booking: Get profile error');
        this.CheckPage();
      }else if(profile.responseCode == 1 || profile.responseCode == 2){
        this.userData.logout();
        console.log('logout from lcl booking: Have a problem from DB');
        this.CheckPage();
      }else{
        this.toSummary(form);
        console.log('loggedIn from lcl booking');
      }
    });
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
