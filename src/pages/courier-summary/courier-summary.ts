import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController, Events } from 'ionic-angular';
import {CompletedPage} from "../completed/completed";
import {DgPopupModalPage} from "../dg-popup-modal/dg-popup-modal";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { BookingServiceProvider } from '../../providers/booking-service/booking-service';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-courier-summary',
  templateUrl: 'courier-summary.html',
})
export class CourierSummaryPage {
  bookingData:Array<any>;
  work:any;
  errorMessage:any;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public mdlCtrl: ModalController,
      public authService: AuthServiceProvider,
      public bookingServiceProvider:BookingServiceProvider,
      public userData: UserData,
      public events: Events
    ) {
      this.bookingData = this.navParams.get('bookingData');
      this.work = this.navParams.get('work');
      // console.log("Summary DAta:"+JSON.stringify(this.bookingData));
      // console.log("Summary DAta2:"+JSON.stringify(this.bookingData[0]));
      // console.log("Summary DAta3:"+JSON.stringify(this.bookingData[0].master));
      //console.log("Summary DAta4:"+JSON.stringify(this.bookingData[0].master[0].bc_booking_id));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierSummaryPage');
  }

  toComplete(bookingId:any){
    console.log("BookinID :"+bookingId);
    this.bookingServiceProvider.updateBookingStatus(this.bookingData[0].master[0].bc_booking_id,30,2).subscribe(
              (res) => {
                        if(res.responseCode == 0){
                          this.events.publish('checkStsLogin',CompletedPage,
                            {
                               booking_id: this.bookingData[0].master[0].bc_booking_id,
                               type:"Courier",
                               work:this.work,
                               status:'success'
                            })
                        }else if(res=='Unauthorized: Access is denied due to invalid credentials.'){
                          this.events.publish('checkStsLogin',CompletedPage,
                            {
                               message:'Unauthorized: Access is denied due to invalid credentials.',
                               type:"Courier",
                               work:this.work,
                               status:'error'
                            })
                        }
                        else{
                          this.events.publish('checkStsLogin',CompletedPage,
                            {
                               message:res.responseMessage,
                               type:"Courier",
                               work:this.work,
                               status:'error'
                            })  
                        }
                        
                      },
              (error) => {  this.errorMessage = <any> error,
                            this.events.publish('checkStsLogin',CompletedPage,
                            {
                               message:this.errorMessage,
                               type:"Courier",
                               work:this.work,
                               status:'error'
                            })
                          });
    
    //this.events.publish('loadpage');
    //this.events.publish('checkStsLogin',CompletedPage);
  }

  dgModalShow() {
    let dgModal = this.mdlCtrl.create(DgPopupModalPage);
    dgModal.present();
  }

}
