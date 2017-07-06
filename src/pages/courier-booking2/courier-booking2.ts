import { Component, ViewChild } from '@angular/core';
import { Navbar,NavController, NavParams ,ModalController, Events } from 'ionic-angular';
import {CourierItemModalPage} from "../courier-item-modal/courier-item-modal";
import {CourierSummaryPage} from "../courier-summary/courier-summary";
import {BookingServiceProvider} from '../../providers/booking-service/booking-service';
import { UserData } from '../../providers/user-data';
import { Subscription } from 'rxjs/Subscription';

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
  sub: Subscription;

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierBooking2Page');
    this.navbar.backButtonClick=(e:UIEvent)=>{
      this.toEditMasterDetail();
    }
    this.events.subscribe('deleteCourierItem',(_bookingId:any,_index:any)=>{
      this.deleteCourierItem(_bookingId,_index);
      // console.log('subscribe');
    });
  }

  ionViewWillLeave(){
    this.events.unsubscribe('deleteCourierItem');
  }

  getCourierData(){
      this.bookingServiceProvider.getCourierDetail(this.masterData.bookingId).subscribe(
        (res) => {
                  this.bookingData = res,
                  this.checkCourierDetail(res[0].detail),
                  this.events.publish('dismissLoading');
                  //console.log("Detail Data :"+JSON.stringify(this.bookingData));
                },
        (error) => {  this.errorMessage = <any> error});
  }

  toEditMasterDetail(){
    this.navCtrl.pop().then(() => this.navParams.get('resolve')(this.masterData.bookingId));
  }

  addCourierItem(action: String) {
    //console.log("Action:"+action);
    this.events.publish('checkStsLogin','check');
    let addItem = this.mdlCtrl.create(CourierItemModalPage,{type:action,id:this.masterData.bookingId,data:null});
    addItem.present();
    addItem.onDidDismiss(data=>{
      this.getCourierData();
      /*if(data!=null){
        this.events.publish('dismissLoading');
      }*/
    });
  }

  editCourierItem(action: String,itemData:any) {
    //console.log("Action:"+action);
    //console.log("Item Data:"+JSON.stringify(itemData));
    this.events.publish('checkStsLogin','check');
    let editItem = this.mdlCtrl.create(CourierItemModalPage,{type:action,data:itemData});
    editItem.present();
    editItem.onDidDismiss(data=>{
      this.getCourierData();
    });
  }

  confirmDelete(_Id:any,_InDex:any){
    this.events.publish('confirmBox',_Id,_InDex);
    // console.log('con publish');
  }

  deleteCourierItem(bookingId:any,index:any){
      //console.log("Courier Item SEQ:"+index);
      this.sub = this.bookingServiceProvider.deleteCourierItem(bookingId,index).subscribe(
          (res)=> { this.getCourierData();
                    this.sub.unsubscribe();
                    console.log('unsub from courier');
                    //console.log("Delete Courier Item "+index+" :"+JSON.stringify(res))
                  },
          (error)=> this.errorMessage = <any>error
      );
  }

  toSummary(){
    this.events.publish('showLoading');
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
