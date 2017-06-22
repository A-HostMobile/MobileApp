import { Component } from '@angular/core';
import {Events, ViewController,NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {PickupAddressServiceProvider} from '../../providers/pickup-address-service/pickup-address-service';


@Component({
  selector: 'page-add-pickup-modal',
  templateUrl: 'add-pickup-modal.html',
})
export class AddPickupModalPage {
  submitted:boolean = false;
  pickupAddress:any;
  pickupType:any;
  countries:{country_code?:string,country_name?:string} = {country_code:'TH',country_name:'THAILAND'};
  errorMessage:string;


  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              public pickupAddressService:PickupAddressServiceProvider,
              public events: Events) {

      this.pickupAddress = this.navParams.get('pickupData');
      if(this.pickupAddress == null){
          this.pickupAddress = {pa_contact_name:null,pa_tel:null,pa_email:null,pa_address:null,pa_postal_code:null}
      }
      this.pickupType = this.navParams.get('type');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPickupModalPage');
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }


  addAddress(form: NgForm) {
    console.log("Manage Address Form:" + JSON.stringify(form.value));
    this.events.publish('showLoading');
    this.pickupAddressService.insertPickupAddress(form.value).subscribe(
       (resData) => {
                      console.log("Insert Pickup Address Success :"+JSON.stringify(resData)),
                      this.viewCtrl.dismiss(form.value),
                      this.events.publish('dismissLoading');
                     },
        (error) => { this.errorMessage = <any> error,
                     this.events.publish('dismissLoading');
                   });
  }

  editAddress(form: NgForm){
    console.log("Edit Address Form:"+JSON.stringify(form.value));
    this.events.publish('showLoading');
    this.pickupAddressService.updatePickupAddress(form.value).subscribe(
       (resData) => {
                      console.log("Update Pickup Address Success :"+JSON.stringify(resData)),
                      this.viewCtrl.dismiss(form.value),
                      this.events.publish('dismissLoading');
                     },
        (error) => { this.errorMessage = <any> error,
                     this.events.publish('dismissLoading');
                   });
  }

  }
