import { Component } from '@angular/core';
import { ViewController,NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";

export interface cvalue{
  co:string;cname:string;
}
@Component({
  selector: 'page-add-pickup-modal',
  templateUrl: 'add-pickup-modal.html',
})
export class AddPickupModalPage {
  submitted:boolean = false;
  pickupAddress:any;
  countries:cvalue[]=[{co:'TH',cname:'Thailand'},
    {co:'HK',cname:'Hongkong'},
    {co:'JP',cname:'Japan'}];
  add:{contactname?:string,tel?:string,email?:string,address?:string,zipcode?:string,country?:string}={country:'TH'};
  constructor(public viewCtrl: ViewController,public navParams: NavParams,) {
      this.pickupAddress = this.navParams.data;
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
    // this.submitted=true;
    // if(form.valid){
    //   console.log(this.add);
    //   this.viewCtrl.dismiss();
    // }
  }

}
