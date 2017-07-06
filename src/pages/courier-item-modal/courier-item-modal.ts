import { Component,Input } from '@angular/core';
import {Events, NavParams, ViewController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {QuickcodeProvider} from '../../providers/quickcode/quickcode';
import {BookingServiceProvider} from '../../providers/booking-service/booking-service';

export interface CommodityInterface{
  qc_lookup_code:any;
  qc_lookup_value1:any;
  qc_lookup_value2:any;
}
@Component({
  selector: 'page-courier-item-modal',
  templateUrl: 'courier-item-modal.html',
})
export class CourierItemModalPage {
  @Input()
  commodityInterface: CommodityInterface;
  StatusText: String;
  selectcancel:boolean = false;
  type:string;
  data:any;
  add_bookingID:any;
  errorMessage:string;
  commodities:Array<CommodityInterface>;
  item:{commodity?:any,dwidth?:any,dlength?:any,dheight?:any,weight?:any,quantity?:any}={commodity:null,dwidth:null,dlength:null,dheight:null,weight:null,quantity:null};
  fixDimension:any;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              public events: Events,
              public qiuckcodeProvider: QuickcodeProvider,
              public bookingServiceProvider:BookingServiceProvider) {
       this.type = this.navParams.get('type');
       this.data = this.navParams.get('data');
       this.add_bookingID = this.navParams.get('id');

       if(this.type == 'Edit'){
          this.item.commodity = this.data.bcd_commodity_code;
          if(this.data.commodity_value2 == '1'){
              this.fixDimension = true;
          }
          else{
              this.fixDimension = false;
          }
          this.item.dwidth = this.data.bcd_width;
          this.item.dlength = this.data.bcd_long;
          this.item.dheight = this.data.bcd_heigth;
          this.item.weight = this.data.bcd_unit_weight;
          this.item.quantity = this.data.bcd_quantity;

       }
       //console.log("TYPE:"+this.type);
       //console.log("Data in Item Page:"+JSON.stringify(this.type));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierItemModalPage');
    this.qiuckcodeProvider.getCommodities().subscribe(
        (res) => {
                  this.commodities = res.responseData
                 },
        (error) => {  this.errorMessage = <any> error});
  }

  checkDimension(code:any){
      let searchData = this.commodities.filter(item => item.qc_lookup_code === code);
      if(searchData[0].qc_lookup_value2 == 1){
          this.item.dwidth = 33;
          this.item.dlength = 31;
          this.item.dheight = 2;
          this.fixDimension = true;
      }
      else{
          this.fixDimension = false;
      }
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }

  addItem(form:NgForm){
    if(form.valid){
      this.events.publish('showLoading');
      //console.log("Add Item Booking ID:"+this.add_bookingID);
      //console.log("Add Item Data:"+JSON.stringify(form.value));
      this.bookingServiceProvider.insertCourierItem(form.value,this.add_bookingID).subscribe(
            (res)=>this.viewCtrl.dismiss(res),
            (error) => this.errorMessage = <any>error
        );
    }
  }
  editItem(form:NgForm){

    if(form.valid){
      //console.log("Edit Item Booking ID:"+this.data.bcd_booking_id);
      //console.log("Edit Item SEQ:"+this.data.bcd_seq);
      //console.log("Edit Item Data:"+JSON.stringify(form.value));
      this.bookingServiceProvider.updateCourierItem(form.value,this.data.bcd_booking_id,this.data.bcd_seq).subscribe(
            (res) => this.viewCtrl.dismiss(res),
            (error) => this.errorMessage = <any>error
      );
    }
  }


  touch(){
      this.selectcancel = true;
   }
}
