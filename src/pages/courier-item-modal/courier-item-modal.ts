import { Component } from '@angular/core';
import { NavParams, ViewController} from 'ionic-angular';
import {NgForm} from "@angular/forms";

export interface commovalue{
  va:string;name:string;
}
@Component({
  selector: 'page-courier-item-modal',
  templateUrl: 'courier-item-modal.html',
})
export class CourierItemModalPage {
  StatusText: String;
  submitted:boolean = false;
  commodities:commovalue[]=[{va:'cer',name:'Ceramic'},{va:'ex1',name:'Example1'},{va:'ex2',name:'Example2'}];
  item:{commodity?:string,dw?:number,dl?:number,dh?:number,weight?:number,quantity?:number}={commodity:'cer'};
  constructor(public viewCtrl: ViewController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierItemModalPage');
    this.StatusText = this.navParams.get('status');
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }

  addItem(form:NgForm){
    this.submitted = true;
    if(form.valid){
      console.log(this.item);
      this.viewCtrl.dismiss();
    }
  }
  editItem(){
    this.viewCtrl.dismiss();
  }
}
