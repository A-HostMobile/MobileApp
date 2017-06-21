import { Component } from '@angular/core';
import {Events, ViewController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {HomePage} from "../home/home";
import {ProfilePage} from "../profile/profile";

export interface cvalue{
  co:string;cname:string;
}
@Component({
  selector: 'page-add-pickup-modal',
  templateUrl: 'add-pickup-modal.html',
})
export class AddPickupModalPage {
  submitted:boolean = false;
  countries:cvalue[]=[{co:'TH',cname:'Thailand'},
    {co:'HK',cname:'Hongkong'},
    {co:'JP',cname:'Japan'}];
  add:{contname?:string,tel?:string,email?:string,address?:string,zip?:string,country?:string}={country:'TH'};
  constructor(public viewCtrl: ViewController,public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPickupModalPage');
  }


  closemodal() {
    this.viewCtrl.dismiss();
  }
  addAddress(){
    console.log('add')
    this.events.publish('checkStsLogin',ProfilePage);
    /*this.submitted=true;
    if(form.valid){
      console.log(this.add);
      this.events.publish('checkStsLogin');
    }*/
  }

}
