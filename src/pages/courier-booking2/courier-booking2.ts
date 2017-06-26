import { Component, ViewChild } from '@angular/core';
import { Navbar,NavController, NavParams ,ModalController, Events } from 'ionic-angular';
import {CourierItemModalPage} from "../courier-item-modal/courier-item-modal";
import {CourierSummaryPage} from "../courier-summary/courier-summary";
import {BookingServiceProvider} from '../../providers/booking-service/booking-service';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-courier-booking2',
  templateUrl: 'courier-booking2.html',
})
export class CourierBooking2Page {
  @ViewChild(Navbar) navbar: Navbar;
  masterData:any;
  bookingData:Array<any>;
  calWeight:any;
  totalCost:any;
  courierNote:any = null;
  bookingID:any;
  errorMessage:string;
  data:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mdlCtrl: ModalController,
    public bookingServiceProvider: BookingServiceProvider,
    public userData: UserData,
    public events: Events
  ) {
      this.masterData = this.navParams.get('data');
      this.getCourierData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierBooking2Page');
    this.navbar.backButtonClick=(e:UIEvent)=>{
      this.toEditMasterDetail();
    }

  }

  getCourierData(){
    this.events.publish('showLoading');
      this.bookingServiceProvider.getCourierDetail(this.masterData.bookingId).subscribe(
        (res) => {
                  this.bookingData = res,
                  this.events.publish('dismissLoading'),
                  console.log("Detail Data :"+JSON.stringify(this.bookingData));
                },
        (error) => {  this.errorMessage = <any> error});
  }

  toEditMasterDetail(){
    this.navCtrl.pop().then(() => this.navParams.get('resolve')(this.masterData.bookingId));
  }

  addCourierItem(action: String) {
    console.log("Action:"+action);
    this.events.publish('checkStsLogin',CourierItemModalPage);
    let addItem = this.mdlCtrl.create(CourierItemModalPage,{type:action,data:null});
    addItem.onDidDismiss(data=>{
      this.getCourierData();
    });
  }

  editCourierItem(action: String,itemData:any) {
    console.log("Action:"+action);
    console.log("Item Data:"+JSON.stringify(itemData));
    this.events.publish('checkStsLogin',CourierItemModalPage);
    let editItem = this.mdlCtrl.create(CourierItemModalPage,{type:action,data:itemData});
    editItem.onDidDismiss(data=>{
      this.getCourierData();
    });
  }

  deleteCourierItem(index:any){
      console.log("Courier Item SEQ:"+index);
  }

  toSummary(){
    this.events.publish('loadpage');
    console.log('login from courier page 2');
    this.events.publish('checkStsLogin',CourierSummaryPage);

  }

}
