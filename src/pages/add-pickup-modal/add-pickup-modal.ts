import { Component } from '@angular/core';
import {Events, ViewController,NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'page-add-pickup-modal',
  templateUrl: 'add-pickup-modal.html',
})
export class AddPickupModalPage {
  submitted:boolean = false;
  pickupAddress:any;
  pickupType:any;
  countries:{country_code?:string,country_name?:string} = {country_code:'TH',country_name:'THAILAND'};


  constructor(public viewCtrl: ViewController,public navParams: NavParams,public events: Events) {
      this.pickupAddress = this.navParams.get('pickupData');
      if(this.pickupAddress == null){
          this.pickupAddress = {pa_contact_name:null,pa_tel:null,pa_email:null,pa_address:null,pa_postal_code:null}
      }
      this.pickupType = this.navParams.get('type');

      console.log("Edit PickupAdress Data:"+JSON.stringify(this.pickupAddress));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPickupModalPage');
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }


  addAddress(form: NgForm){
    console.log("Manage Address Form:"+JSON.stringify(form.value));
    this.viewCtrl.dismiss(form.value);
    this.events.publish('checkStsLogin','modal');

  }

}
