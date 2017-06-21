import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController ,ModalController, Events} from 'ionic-angular';
import {AddPickupModalPage} from "../add-pickup-modal/add-pickup-modal";
import {PickupAddressServiceProvider} from '../../providers/pickup-address-service/pickup-address-service';{}

@IonicPage()
@Component({
  selector: 'page-pickup-address',
  templateUrl: 'pickup-address.html',
})
export class PickupAddressPage {

  pickupAddress: any;
  errorMessage:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public mdlCtrl: ModalController,
              public pickupAddressService:PickupAddressServiceProvider,
              public events: Events) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickupAddressPage');
    this.events.publish('showLoading');
    this.pickupAddressService.getPickupAddress().subscribe(
        (resData) => { this.pickupAddress = resData,
                       console.log("PickupAddress Data:"+JSON.stringify(this.pickupAddress)),
                       this.events.publish('dismissLoading');
                     },
        (error) => { this.errorMessage = <any> error,
                     this.events.publish('dismissLoading'); 
                   });
    
  }

  openManagePickup(pickupData:any){
    //console.log("Edit Data:"+JSON.stringify(pickupData));
    let managePickup = this.mdlCtrl.create(AddPickupModalPage,{'pickupData':pickupData,'type':'edit'});
    managePickup.present();
  }

  addPickup(){
      console.log("Add Pickup Address");
      let managePickup = this.mdlCtrl.create(AddPickupModalPage,{'pickupData':null,'type':'add'});
      managePickup.present();
  }

  selected(pickupData:any) {
    //this.viewCtrl.dismiss(this.address);
    console.log("Select Data:"+JSON.stringify(pickupData));
    //this.viewCtrl.dismiss();
  }

  delete(pickupId:any){
      console.log("Delete Data:"+JSON.stringify(pickupId));
  }

  closeModal(){
    //this.address=null;
    //this.viewCtrl.dismiss(this.address);
    this.viewCtrl.dismiss();
  }


}
