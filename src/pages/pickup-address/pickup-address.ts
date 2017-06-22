import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController ,ModalController, Events} from 'ionic-angular';
import {AddPickupModalPage} from "../add-pickup-modal/add-pickup-modal";
import {PickupAddressServiceProvider} from '../../providers/pickup-address-service/pickup-address-service';

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
              public pickupAddressService:PickupAddressServiceProvider,
              public events: Events) {
    this.param = this.navParams.get('param');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickupAddressPage');
    this.getPickupAddress();
  }

  getPickupAddress(){
    this.events.publish('showLoading');
    this.pickupAddressService.getPickupAddress().subscribe(
        (resData) => { this.pickupAddress = resData,
                       console.log("PickupAddress Data:"+JSON.stringify(this.pickupAddress))
                       this.events.publish('dismissLoading');
                     },
        (error) => { this.errorMessage = <any> error,
                     this.events.publish('dismissLoading');
                   });
  }

  editPickup(pickupData:any){
    this.events.publish('checkStsLogin',AddPickupModalPage,{'pickupData':pickupData,'type':'edit'});
    let manageItem = this.mdlCtrl.create(AddPickupModalPage,{'pickupData':pickupData,'type':'edit'});
    manageItem.present();
    manageItem.onDidDismiss(data=>{
        this.getPickupAddress();
    });
  }

  addPickup(){
    console.log("Add Pickup Address");
    this.events.publish('checkStsLogin',AddPickupModalPage,{'pickupData':null,'type':'add'});
    let manageItem = this.mdlCtrl.create(AddPickupModalPage,{'pickupData':null,'type':'add'});
    manageItem.present();
    manageItem.onDidDismiss(data=>{
      if(data!=null){
        this.getPickupAddress();
      }
    });
  }

  selectPickup(pickupData:any) {
    this.viewCtrl.dismiss(pickupData);
    this.events.publish('checkStsLogin','modal');
    console.log("Select Data:"+JSON.stringify(pickupData));
  }

  deletePickup(pickupId:any){
    console.log("Delete Data:"+JSON.stringify(pickupId));
    this.pickupAddressService.deletePickupAddress(pickupId).subscribe(
        (resData) => {
                      console.log("Delete Pickup Address Success :"+JSON.stringify(resData)),
                      this.getPickupAddress();
                     },
        (error) => { this.errorMessage = <any> error,
                     this.events.publish('dismissLoading');
                   });
  }

  closeModal(){
    this.viewCtrl.dismiss('no');
  }

}
