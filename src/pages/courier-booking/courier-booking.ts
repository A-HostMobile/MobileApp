import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ViewController, ModalController, Events} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {LoginPage} from "../login-modal/login-modal";
import {CourierBooking2Page} from "../courier-booking2/courier-booking2";
import {PickupAddressPage} from "../pickup-address/pickup-address";
import {CountryZoneProvider} from '../../providers/country-zone/country-zone';
import {BookingServiceProvider} from '../../providers/booking-service/booking-service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'page-courier-booking',
  templateUrl: 'courier-booking.html',
})
export class CourierBookingPage {

  @ViewChild(Navbar) navbar: Navbar;
  dataogj:any = null;
  pick: boolean = true;
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
    rmk?:string,
    work?:any}={booking:null};

  constructor(
              public events: Events,
              public userData: UserData,
              public navParams: NavParams,
              public navCtrl: NavController,
              public viewCtrl: ViewController,
              public mdlCtrl: ModalController,
              public countryZoneProvider: CountryZoneProvider,
              public bookingServiceProvider: BookingServiceProvider,
            ) {
      this.countryZoneProvider.getCountryZone().subscribe(
        (res) => this.countries = res,
        (error) => {  this.errorMessage = <any> error});
      this.events.subscribe('setaddress',(data:any)=>{
        this.courier.pickup = data.contactname+"\nTel : "+data.tel+"\nE-Mail : "+data.email+"\n"+data.address+"\n"+data.zipcode+"\n"+data.country;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierBookingPage');
    this.navbar.backButtonClick=(e:UIEvent)=>{
      if(this.courier.booking != null){
          this.bookingServiceProvider.updateBookingStatus(this.courier.booking,40,2).subscribe(
              (res) => this.navCtrl.pop(),
              (error) => {  this.errorMessage = <any> error});
      }
      else{
          this.navCtrl.pop()
      }
    }
  }

  ionViewDidEnter(){
    this.events.publish('dismissLoading');
  }

  ionViewCanEnter() {
    let modal = this.mdlCtrl.create(LoginPage, CourierBookingPage);
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn === true) {
        return true;
      }
      else {
        this.navCtrl.pop();
        modal.present();
        return false;
      }
    });
  }

  touch() {
    this.submitted = true;
  }

  toCourier2(form: NgForm){
    if(form.valid) {
      this.events.publish('showLoading')
        if(form.value.bookingId==null){
            //console.log("After Booking Courier Insert:"+form.value.bookingId);

           this.bookingServiceProvider.insertBookingCourier(form.value).subscribe(
           (res) => {
                           form.value.bookingId = res.booking_id;
                           this.courier.work = res.work_time;
                           //console.log("Insert MasterData Success:"+JSON.stringify(form.value)),
                           new Promise((resolve, reject) => {
                                this.navCtrl.push(CourierBooking2Page, {data:form.value,work:this.courier.work,resolve: resolve});
                            }).then(data => {
                                this.courier.booking = data.toString()
                            });
                      },
            (error) => {  this.errorMessage = <any> error});
        }else{

             this.bookingServiceProvider.updateBookingCourier(form.value).subscribe(
              (res) => {
                           //console.log("Update MasterData Success:"+JSON.stringify(res)),
                           this.courier.work = res.work_time;
                           //this.courier.work = '1'; //debug
                           new Promise((resolve, reject) => {
                                this.navCtrl.push(CourierBooking2Page, {data:form.value,work:this.courier.work,resolve: resolve});
                            }).then(data => {
                                this.courier.booking = data.toString()
                            });
                        },
                (error) => {  this.errorMessage = <any> error});
        }

    }

  }

  openPickupModal()
    {
      this.events.publish('checkStsLogin', 'check');
      let openPickup = this.mdlCtrl.create(PickupAddressPage,{address:this.dataogj});
      openPickup.present();
      openPickup.onDidDismiss(data => {
        if (data != null) {
          if (data == 'nodata') {
            this.pick = false;
            this.courier.pickup = null;
          } else {
            console.log(data);
            this.dataogj = data;
            this.courier.pickup = data.pa_address_display;
          }
        }
      });
    }

}
