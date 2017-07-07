import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ViewController, ModalController, Events, App} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {LoginPage} from "../login-modal/login-modal";
import {CourierBooking2Page} from "../courier-booking2/courier-booking2";
import {PickupAddressPage} from "../pickup-address/pickup-address";
import {CountryZoneProvider} from '../../providers/country-zone/country-zone';
import {BookingServiceProvider} from '../../providers/booking-service/booking-service';
import {AbstractControl, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

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
  /*courier:{booking?:string,
   pickup?:string,
   conname?:string,
   address?:string,
   country?:string,
   zipcode?:string,
   contname?:string,
   tel?:string,
   rmk?:string,
   work?:any}={booking:null};*/
  pickupadd:string;
  courier:FormGroup;
  conname:AbstractControl;
  address:AbstractControl;
  country:AbstractControl;
  contname:AbstractControl;
  tel:AbstractControl;

  constructor(
    public app: App,
    public events: Events,
    public userData: UserData,
    public navParams: NavParams,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public mdlCtrl: ModalController,
    public countryZoneProvider: CountryZoneProvider,
    public bookingServiceProvider: BookingServiceProvider,
  ) {
    this.countryZoneProvider.getCountryZone().subscribe(
      (res) => this.countries = res,
      (error) => {  this.errorMessage = <any> error});
    this.courier = this.formBuilder.group({
      'booking':[''],
      'pickup':[''],
      'conname':['',Validators.compose([Validators.required])],
      'address':['',Validators.compose([Validators.required])],
      'country':['',Validators.compose([Validators.required])],
      'zipcode':[''],
      'contname':['',Validators.compose([Validators.required])],
      'tel':['',Validators.compose([Validators.required])],
      'rmk':[''],
      'work':[''],
    });
    this.conname = this.courier.controls['conname'];
    this.address = this.courier.controls['address'];
    this.country = this.courier.controls['country'];
    this.contname = this.courier.controls['contname'];
    this.tel = this.courier.controls['tel'];
    this.events.subscribe('setaddress',(data:any)=>{
      this.courier.value.pickup = data.contactname+"\nTel : "+data.tel+"\nE-Mail : "+data.email+"\n"+data.address+"\n"+data.zipcode+"\n"+data.country;
    });
    this.events.subscribe('BookingNullCheck',(BookingId:any)=>{
      this.BookingNullCheck(BookingId);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierBookingPage');
    this.navbar.backButtonClick=(e:UIEvent)=>{
      if(this.courier.value.booking != null){
          this.events.publish('confirmBox',this.courier.value.booking,null,'CourierBookingPage','Close')
      }
      else{
        this.navCtrl.pop()
      }
    }
  }

  ionViewDidLeave(){
    this.events.unsubscribe('setaddress');
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

  BookingNullCheck(bookingId:any){
    this.bookingServiceProvider.updateBookingStatus(bookingId,40,2).subscribe(
      (res) => {this.app.getActiveNav().pop(); console.log('nav pop courier')},
      (error) => {  this.errorMessage = <any> error});
  }

  touch() {
    this.submitted = true;
  }

  toCourier2(form: NgForm){
    form.value.pickup = this.pickupadd;
    console.log(form.value);
    if(form.value.pickup!=null) {
      console.log('pickup != null')
      if (this.courier.valid) {
        this.events.publish('showLoading')
        if (form.value.booking == null) {
          // console.log("After Booking Courier Insert:"+form.value.bookingId);
          this.bookingServiceProvider.insertBookingCourier(form.value).subscribe(
            (res) => {
              form.value.bookingId = res.booking_id;
              this.courier.value.work = res.work_time;
              //console.log("Insert MasterData Success:"+JSON.stringify(form.value)),
              new Promise((resolve, reject) => {
                this.navCtrl.push(CourierBooking2Page, {
                  data: form.value,
                  work: this.courier.value.work,
                  resolve: resolve
                });
              }).then(data => {
                this.courier.value.booking = data.toString()
              });
            },
            (error) => {
              this.errorMessage = <any> error
            });
        } else {
          console.log('booking != null')
          this.bookingServiceProvider.updateBookingCourier(form.value).subscribe(
            (res) => {
              //console.log("Update MasterData Success:"+JSON.stringify(res)),
              this.courier.value.work = res.work_time;
              //this.courier.work = '1'; //debug
              new Promise((resolve, reject) => {
                this.navCtrl.push(CourierBooking2Page, {
                  data: form.value,
                  work: this.courier.value.work,
                  resolve: resolve
                });
              }).then(data => {
                this.courier.value.booking = data.toString()
              });
            },
            (error) => {
              this.errorMessage = <any> error
            });
        }
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
          this.pickupadd = this.courier.value.pickup = null;
        } else {
          this.dataogj = data;
          this.pickupadd = this.courier.value.pickup = data.pa_address_display;
        }
      }
    });
  }

}
