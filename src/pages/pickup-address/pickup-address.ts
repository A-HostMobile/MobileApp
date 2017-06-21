import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController ,ModalController, Events} from 'ionic-angular';
import {AddPickupModalPage} from "../add-pickup-modal/add-pickup-modal";
import {BookingServiceProvider} from '../../providers/booking-service/booking-service';
import {ProfilePage} from "../profile/profile";

@IonicPage()
@Component({
  selector: 'page-pickup-address',
  templateUrl: 'pickup-address.html',
})
export class PickupAddressPage {
  address: string;
  pickupAddress: any;
  errorMessage:string;
  page:any;
  param:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public mdlCtrl: ModalController,
              public bookingService:BookingServiceProvider,
              public events: Events) {
    this.param = this.navParams.get('param');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickupAddressPage');
    this.events.publish('showLoading');
    this.bookingService.getPickupAddress().subscribe(
        (resData) => { this.pickupAddress = resData,
                       console.log("PickupAddress Data:"+JSON.stringify(this.pickupAddress)),
                       this.events.publish('dismissLoading');
                     },
        (error) => { this.errorMessage = <any> error,
                     this.events.publish('dismissLoading');
                   });

  }

  openManagePickup(pickupData:any){
    this.events.publish('checkStsLogin',AddPickupModalPage,pickupData);
  }

  openAddPickup(){
    this.events.publish('checkStsLogin',AddPickupModalPage);
  }

  selected(pickupData:any) {
    this.viewCtrl.dismiss(pickupData);
    this.events.publish('checkStsLogin','modal');
    console.log("Select Data:"+JSON.stringify(pickupData));
  }

  delete(pickupId:any){
    console.log("Delete Data:"+JSON.stringify(pickupId));
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
