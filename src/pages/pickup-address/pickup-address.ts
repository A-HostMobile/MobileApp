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
  page:any;
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

        this.param = this.navParams.data;

        if(this.param == ProfilePage){
          this.checkFromPage = "ProfilePage";
            console.log(this.checkFromPage)
        }

        this.events.subscribe('deletePickup',(_pickupId:any)=>{
          this.deletePickup(_pickupId);
          // console.log('subscribe');
          // console.log(_pickupId+'subscr delete');
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickupAddressPage');
    this.getPickupAddress();
  }

  getPickupAddress(){
    this.events.publish('showLoading');
    this.pickupAddressService.getPickupAddress().subscribe(
        (resData) => { this.pickupAddress = resData
                       //console.log("PickupAddress Data:"+JSON.stringify(this.pickupAddress))
                       this.events.publish('dismissLoading');
                      //  console.log('res data');
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
    //console.log("Add Pickup Address");
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
    this.events.publish('checkStsLogin',PickupAddressPage);
    this.viewCtrl.dismiss(pickupData);
    //console.log("Select Data:"+JSON.stringify(pickupData));
  }

  confirmDelete(_pickupId:any){
    this.events.publish('confirmBox',_pickupId,null,'PickupAddressPage');
    // console.log('con publish');
  }

  deletePickup(pickupId:any){
    //console.log("Delete Data:"+JSON.stringify(pickupId));
    console.log('before delete');
    this.sub = this.pickupAddressService.deletePickupAddress(pickupId).subscribe(
        (resData) => {
                      //console.log("Delete Pickup Address Success :"+JSON.stringify(resData)),
                      this.getPickupAddress();
                      this.sub.unsubscribe();
                      console.log('unsub');
                     },
        (error) => { this.errorMessage = <any> error,
                     this.events.publish('dismissLoading');
                   });
  }

  closeModal(){
    this.viewCtrl.dismiss('no');
  }

}
