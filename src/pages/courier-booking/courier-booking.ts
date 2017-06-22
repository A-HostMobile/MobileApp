import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ViewController, ModalController, Events} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {LoginPage} from "../login-modal/login-modal";
import {CourierBooking2Page} from "../courier-booking2/courier-booking2";
import {PickupAddressPage} from "../pickup-address/pickup-address";
import {CountryZoneProvider} from '../../providers/country-zone/country-zone';
import {BookingServiceProvider} from '../../providers/booking-service/booking-service';
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
  courier:{booking?:string,
    pickup?:string,
    conname?:string,
    address?:string,
    country?:string,
    zipcode?:string,
    contname?:string,
    tel?:string,
    rmk?:string}={booking:null};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public countryZoneProvider: CountryZoneProvider,
              public bookingServiceProvider: BookingServiceProvider,
              public mdlCtrl: ModalController,
              public userData: UserData,
              public events: Events
            ) {
      this.courier.booking = this.navParams.get('booking_id');
      if(this.courier.booking == undefined){
          this.courier.booking = null;
      }
      
      console.log("Courier Booking ID:"+this.courier.booking);
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
      console.log("Booking Courier Data:"+JSON.stringify(form.value));
        if(form.value.bookingId==null){
            this.bookingServiceProvider.insertBookingCourier(form.value).subscribe(
              (res) => {//this.countries = resPod,
                           form.value.bookingId = res.booking_id;
                           console.log("Insert MasterData Success:"+JSON.stringify(form.value)),
                           this.navCtrl.push(CourierBooking2Page,{data:form.value});  
                        },
              (error) => {  this.errorMessage = <any> error});
        }else{
            this.bookingServiceProvider.updateBookingCourier(form.value).subscribe(
              (res) => {//this.countries = resPod,
                           console.log("Update MasterData Success:"+JSON.stringify(res)),
                           this.navCtrl.push(CourierBooking2Page,{data:form.value});  
                        },
              (error) => {  this.errorMessage = <any> error});
        }
          
    }
          // new Promise((resolve:any, reject:any) => {
          //   this.navCtrl.push(CourierBooking2Page, {data:form.value,resolve: resolve});
          // }).then(data => {
          //   this.courier.booking = data.toString(); 
          // });
          
    
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
