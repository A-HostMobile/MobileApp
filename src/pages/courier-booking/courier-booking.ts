import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ViewController, ModalController, Events} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {LoginPage} from "../login-modal/login-modal";
import {CourierBooking2Page} from "../courier-booking2/courier-booking2";
import {PickupAddressPage} from "../pickup-address/pickup-address";
import {CountryZoneProvider} from '../../providers/country-zone/country-zone';
import {NgForm} from "@angular/forms";

export interface cvalue{
  co:string;cname:string;
}
@Component({
  selector: 'page-courier-booking',
  templateUrl: 'courier-booking.html',
})
export class CourierBookingPage {

  @ViewChild(Navbar) navbar: Navbar;
  pickadd:string = null;
  submitted: boolean = false;
  countries:any;
  errorMessage:any;
  courier:{pickup?:string,
    conname?:string,
    address?:string,
    country?:string,
    zipcode?:string,
    contname?:string,
    tel?:string,
    rmk?:string}={};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public countryZoneProvider: CountryZoneProvider,
              public mdlCtrl: ModalController,
              public userData: UserData,
              public events: Events
            ) {
      this.countryZoneProvider.getCountryZone().subscribe(
        (resPod) => this.countries = resPod,
        (error) => {  this.errorMessage = <any> error});
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

  touch(){
    this.submitted = true;
  }

  toCourier2(form: NgForm){
    if(form.valid) {
          console.log(this.courier);
          this.navCtrl.push(CourierBooking2Page, this.courier);
    }
  }

  openPickupModal(){
    let openPickup = this.mdlCtrl.create(PickupAddressPage);
    openPickup.present();
    openPickup.onDidDismiss(data=>{
      if(data!=null){
        this.courier.pickup = this.pickadd = data.pa_address_display;
      }
    });
  }

}
