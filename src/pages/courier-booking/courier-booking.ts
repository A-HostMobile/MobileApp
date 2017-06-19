import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {LoginPage} from "../login-modal/login-modal";
import {CourierBooking2Page} from "../courier-booking2/courier-booking2";
import {PickupAddressPage} from "../pickup-address/pickup-address";
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'page-courier-booking',
  templateUrl: 'courier-booking.html',
})
export class CourierBookingPage {

  @ViewChild(Navbar) navbar: Navbar;
  pickadd:string = '';
  submitted: boolean = false;
  courier:{pick?:string,
    conname?:string,
    address?:string,
    country?:string,
    zip?:string,
    contname?:string,
    tel?:string,
    rmk?:string} = {country:'US'};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public mdlCtrl: ModalController,
              public userData: UserData,
              public authService: AuthServiceProvider
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierBookingPage');
  }

  ionViewCanEnter(){
    let modal = this.mdlCtrl.create(LoginPage, CourierBookingPage);
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn === true) { return true; }
      else { this.navCtrl.pop(); modal.present(); return false; }
    });
  }

  toCourier2(form: NgForm){
    this.submitted = true;
    this.authService.getProfile().subscribe((res)=>{
      let profile = res;
      if(profile.responseCode == 3){
        this.userData.logout();
        alert('Please try to logIn again');
        console.log('logout from courier page 1: Get profile error');
      }else if(profile.responseCode == 1 || profile.responseCode == 2){
        this.userData.logout();
        alert('Please try to logIn again');
        console.log('logout from courier page 1: Have a problem from DB');
      }else{
        console.log('login from courier page 1');
        this.userData.login(profile);
        this.navCtrl.push(CourierBooking2Page,this.courier);
      }
    });
  }

  openPickupModal(){
    let openPickup = this.mdlCtrl.create(PickupAddressPage);
    openPickup.present();
    openPickup.onDidDismiss(data=>{
      this.courier.pick = this.pickadd = data;
    });
  }

}
