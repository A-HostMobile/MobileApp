import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController ,ModalController, Events} from 'ionic-angular';
import {AddPickupModalPage} from "../add-pickup-modal/add-pickup-modal";
import {PickupAddressServiceProvider} from '../../providers/pickup-address-service/pickup-address-service';
import {ProfilePage} from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-pickup-address',
  templateUrl: 'pickup-address.html',
})
export class PickupAddressPage {
  address: string;
  pickupAddress: any;
  errorMessage:string;
  display:any;
  param:any;

  checkFromPage: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public mdlCtrl: ModalController,
              public pickupAddressService:PickupAddressServiceProvider,
              public events: Events) {

    this.param = this.navParams.get('address');
    if(this.param!=null){
      this.display = this.param.pa_address_display;
    }
    this.checkFromPage = this.navParams.get('page');
    console.log(this.display);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickupAddressPage');
    this.getPickupAddress();
  }

  getPickupAddress(){
    this.events.publish('showLoading');
    this.pickupAddressService.getPickupAddress().subscribe(
      (resData) => { this.pickupAddress = resData,
        //console.log("PickupAddress Data:"+JSON.stringify(this.pickupAddress))
        this.events.publish('dismissLoading');
      },
      (error) => { this.errorMessage = <any> error,
        this.events.publish('dismissLoading');
      });
  }

  editPickup(pickupData:any){
    this.events.publish('checkStsLogin',AddPickupModalPage);
    let manageItem = this.mdlCtrl.create(AddPickupModalPage,{'pickupData':pickupData,'type':'edit'});
    manageItem.present();
    manageItem.onDidDismiss(data=>{
      this.getPickupAddress();
    });
  }
  editPickupSelect(pickupData:any){
    this.events.publish('checkStsLogin',AddPickupModalPage);
    let manageItem = this.mdlCtrl.create(AddPickupModalPage,{'pickupData':pickupData,'type':'select'});
    this.viewCtrl.dismiss();
    manageItem.present();
    manageItem.onDidDismiss(data=>{
      this.getPickupAddress();
    });
  }

  addPickup(){
    //console.log("Add Pickup Address");
    this.events.publish('checkStsLogin',AddPickupModalPage);
    let manageItem = this.mdlCtrl.create(AddPickupModalPage,{'pickupData':null,'type':'add'});
    manageItem.present();
    manageItem.onDidDismiss(data=>{
      if(data!=null){
        this.getPickupAddress();
      }
    });
  }

  selectPickup(pickupData:any) {
    this.events.publish('checkStsLogin',PickupAddressPage);
    this.viewCtrl.dismiss(pickupData);
    //console.log("Select Data:"+JSON.stringify(pickupData));
  }

  deletePickup(pickupId:any){
    //console.log("Delete Data:"+JSON.stringify(pickupId));
    this.pickupAddressService.deletePickupAddress(pickupId).subscribe(
      (resData) => {
        //console.log("Delete Pickup Address Success :"+JSON.stringify(resData)),
        this.getPickupAddress();
      },
      (error) => { this.errorMessage = <any> error,
        this.events.publish('dismissLoading');
      });
  }

  closeModal(){
    if(this.param!=null){
      this.viewCtrl.dismiss();
    } else {
      this.viewCtrl.dismiss('nodata');
    }
  }

  selected(address:any):Boolean{
    if(address==this.display){
      return true;
    } else {
      return false;
    }
  }

}
