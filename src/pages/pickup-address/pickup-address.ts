import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController ,ModalController, Events } from 'ionic-angular';
import {AddPickupModalPage} from "../add-pickup-modal/add-pickup-modal";
import {PickupAddressServiceProvider} from '../../providers/pickup-address-service/pickup-address-service';
import {ProfilePage} from '../profile/profile';
import { Subscription } from 'rxjs/Subscription';

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

  _pickupId: any;
  sub: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public mdlCtrl: ModalController,
              public pickupAddressService:PickupAddressServiceProvider,
              public events: Events
  ) {

    this.param = this.navParams.get('address');
    if(this.param!=null){
      this.display = this.param.pa_address_id;
    }
    this.checkFromPage = this.navParams.get('pages');
    console.log(this.display);

    this.events.subscribe('deletePickup',(_pickupId:any)=>{
      this.deletePickup(_pickupId);
      console.log('event delete')
      // this.getPickupAddress();
      // console.log(_pickupId+'subscr delete');
    });
  }
  ionViewWillLeave(){
    this.events.unsubscribe('deletePickup');
  }

  ionViewDidLoad() {
    this.getPickupAddress();
    console.log('ionViewDidLoad PickupAddressPage');
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
    this.events.publish('checkStsLogin','check');
    let manageItem = this.mdlCtrl.create(AddPickupModalPage,{'pickupData':pickupData,'type':'edit'});
    console.log('edit')
    manageItem.present();
    manageItem.onDidDismiss(data=>{
      this.getPickupAddress();
    });
  }

  editSelect(pickupData:any){
    this.events.publish('checkStsLogin','check');
    let manageItem = this.mdlCtrl.create(AddPickupModalPage,{'pickupData':pickupData,'type':'select'});
    console.log('select');
    manageItem.present();
    //this.viewCtrl.dismiss();
  }

  addPickup(){
    //console.log("Add Pickup Address");
    this.events.publish('checkStsLogin','check');
    let manageItem = this.mdlCtrl.create(AddPickupModalPage,{'pickupData':null,'type':'add'});
    console.log('add')
    manageItem.present();
    manageItem.onDidDismiss(data=>{
      if(data!=null){
        this.getPickupAddress();
      }
    });
  }

  selectPickup(pickupData:any) {
    this.events.publish('checkStsLogin','check');
    this.param = 1;
    this.closeModal(pickupData);
    //console.log("Select Data:"+JSON.stringify(pickupData));
  }

  confirmDelete(_pickupId:any){
    this.events.publish('confirmBox',_pickupId,null,'PickupAddressPage','Delete');
    console.log('con publish');
  }

  deletePickup(pickupId:any){
    //console.log("Delete Data:"+JSON.stringify(pickupId));
    console.log('before delete');
    this.sub = this.pickupAddressService.deletePickupAddress(pickupId).subscribe(
      (resData) => {
        //console.log("Delete Pickup Address Success :"+JSON.stringify(resData)),
        if(this.selected(pickupId)){
          this.param = null;
        }
        this.getPickupAddress();
        this.sub.unsubscribe();
        console.log('unsub');
      },
      (error) => { this.errorMessage = <any> error,
        this.events.publish('dismissLoading');
      });
  }

  closeModal(data:any){
    this.events.unsubscribe('deletePickup');
    if(this.param!=null){
      this.viewCtrl.dismiss(data);
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
