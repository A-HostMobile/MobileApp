import { Component, ViewChild } from '@angular/core';
import { Navbar,NavController, NavParams ,ModalController, Events } from 'ionic-angular';
import {CourierItemModalPage} from "../courier-item-modal/courier-item-modal";
import {CourierSummaryPage} from "../courier-summary/courier-summary";
import {CourierBookingPage} from "../courier-booking/courier-booking";
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
  nextToSummary:any=false;
  errorMessage:string;
  work:any;
  item:{commodity?:string,dwidth?:number,dlength?:number,dheight?:number,weight?:number,quantity?:number};
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
      this.work = this.navParams.get('work');
      this.getCourierData();
      //console.log("Master data Courier Page 2:"+JSON.stringify(this.masterData));
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
                  this.checkCourierDetail(res[0].detail),
                  this.events.publish('dismissLoading')
                  //console.log("Detail Data :"+JSON.stringify(this.bookingData));
                },
        (error) => {  this.errorMessage = <any> error});
  }

  toEditMasterDetail(){
    this.navCtrl.pop().then(() => this.navParams.get('resolve')(this.masterData.bookingId));
  }

  addCourierItem(action: String) {
    //console.log("Action:"+action);
    this.events.publish('checkStsLogin',CourierItemModalPage);
    let addItem = this.mdlCtrl.create(CourierItemModalPage,{type:action,id:this.masterData.bookingId,data:null});
    addItem.present();
    addItem.onDidDismiss(data=>{
      this.getCourierData();
      //console.log("Data after Delete Item :"+JSON.stringify(data));
    });
  }

  editCourierItem(action: String,itemData:any) {
    //console.log("Action:"+action);
    //console.log("Item Data:"+JSON.stringify(itemData));
    this.events.publish('checkStsLogin',CourierItemModalPage);
    let editItem = this.mdlCtrl.create(CourierItemModalPage,{type:action,data:itemData});
    editItem.present();
    editItem.onDidDismiss(data=>{
      this.getCourierData();
      //console.log("Data after Edit Item :"+JSON.stringify(data));
    });
  }

  deleteCourierItem(bookingId:any,index:any){
      //console.log("Courier Item SEQ:"+index);
      this.bookingServiceProvider.deleteCourierItem(bookingId,index).subscribe(
          (res)=> { this.getCourierData()
                    //console.log("Delete Courier Item "+index+" :"+JSON.stringify(res))
                  },
          (error)=> this.errorMessage = <any>error
      );
  }

  toSummary(){
    this.events.publish('loadpage');
    //console.log('login from courier page 2');
    this.events.publish('checkStsLogin',CourierSummaryPage,{bookingData:this.bookingData,work:this.work});

  }

  checkCourierDetail(data:any){
    console.log("Check Courier Data:"+JSON.stringify(data));
    console.log("Check Courier Data2:"+data);
  
    if(data != null){
        console.log("Check Null");
        this.nextToSummary = true;
    }else{
        console.log("Check Null");
        this.nextToSummary = false;
    }
  }

}
