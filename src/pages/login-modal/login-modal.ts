import {Component, ViewChild} from '@angular/core';
import {App, Navbar, NavParams, ViewController, AlertController, LoadingController, Events} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LclBookingPage} from "../lcl-booking/lcl-booking";
import {CourierBookingPage} from "../courier-booking/courier-booking";
import {ScheduleResultPage} from "../schedule-result/schedule-result";
import {UserData} from "../../providers/user-data";

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginPage {
  @ViewChild(Navbar) navbar : Navbar;
  submitted = false;
  page : any;
  param: any;
  authForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;

  constructor(public app: App,
              public navParam: NavParams,
              public userData: UserData,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder,
              public authService:AuthServiceProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public events: Events
            ) {
    this.page = this.navParam.get('page');
    this.param = this.navParam.get('param');
    /*console.log(this.page);
    console.log(this.param);*/
    this.authForm = formBuilder.group({
      'username':['',Validators.compose([Validators.required])],
      'password':['',Validators.compose([Validators.minLength(6),Validators.required])]
    });
    this.username = this.authForm.controls['username'];
    this.password = this.authForm.controls['password'];
  }

  onLogin(username:string,password:string) {
    if(this.authForm.valid){
      let loading = this.loadingCtrl.create({
        content: "loggingIn...",
        spinner: 'hide'
      });
      loading.present();
      this.authService.doLogin(username,password).subscribe(
        res => {
          let signin:boolean = res;
          if(signin == true){
            this.viewCtrl.dismiss();
            console.log('Page :'+this.page);
            this.events.publish('checkStsLogin',this.page,this.param);
          }else {
            console.log('login response data fail from login-modal');
          }
        },error => {
          let errorMessage = <any> error
          let alert = this.alertCtrl.create({
              title: errorMessage,
              buttons: ['OK']
          });
          alert.present();
          loading.dismiss();
        },() => loading.dismiss()
      )
    }
  }

  closemodal() {
    this.viewCtrl.dismiss();
    if(this.app.getRootNav().getActive().component!=ScheduleResultPage){
      this.app.getRootNav().popToRoot();
    }
  }

}
