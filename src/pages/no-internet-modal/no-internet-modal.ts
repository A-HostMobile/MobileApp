import { Component } from '@angular/core';
import {Platform, ViewController, ToastController} from 'ionic-angular';
import {Network} from "@ionic-native/network";

@Component({
  selector: 'page-no-internet-modal',
  templateUrl: 'no-internet-modal.html',
})
export class NoInternetModalPage {
  bpress: number = 0;


  constructor(public network: Network,
              public view: ViewController,
              public platform: Platform,
              public toastCtrl: ToastController) {
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let toast = this.toastCtrl.create({message:'Press back button again to exit',duration:2000,position: 'bottom'});
        toast.present();
        this.bpress++;
        setTimeout(()=>{
          this.bpress=0;
        },2000)
        if(this.bpress==2){
          this.platform.exitApp();
        }
      })
    })
  }

  connected = this.network.onConnect().subscribe(()=>{
    this.view.dismiss();
  })

}
