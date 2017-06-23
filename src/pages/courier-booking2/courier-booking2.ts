import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController, Events } from 'ionic-angular';
import {CourierItemModalPage} from "../courier-item-modal/courier-item-modal";
import {CourierSummaryPage} from "../courier-summary/courier-summary";
import {CourierBookingPage} from "../courier-booking/courier-booking";
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-courier-booking2',
  templateUrl: 'courier-booking2.html',
})
export class CourierBooking2Page {
  masterData:any;
  bookingID:any;
  item:{commodity?:string,dwidth?:number,dlength?:number,dheight?:number,weight?:number,quantity?:number};
  data:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mdlCtrl: ModalController,
    public userData: UserData,
    public events: Events
  ) {
      this.masterData = this.navParams.get('data');
      //this.bookingID = "BC-2017-06-111";
      console.log("Master data:"+JSON.stringify(this.masterData));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierBooking2Page');
  }

  toEditMasterDetail(){
    this.navCtrl.pop();
    //this.navCtrl.popTo(CourierBookingPage,{booking_id:"BC-2017-06-111"});
    //this.navCtrl.pop().then(() => this.navParams.get('resolve')(this.bookingID));
  }

  toManageItem(status: String) {
    this.events.publish('checkStsLogin',CourierItemModalPage);
    let manageItem = this.mdlCtrl.create(CourierItemModalPage,{status});
    manageItem.onDidDismiss(data=>{
      if(data!=null){
          /*this.item = { commodity: data.commodity,dwidth: data.dwidth,dlength:data.dlength,dheight:data.dheight,weight:data.weight,quantity:data.quantity};*/
          console.log(data);
      }
    });
  }

  toSummary(){
    this.events.publish('loadpage');
    console.log('login from courier page 2');
    this.events.publish('checkStsLogin',CourierSummaryPage);

  }

}
