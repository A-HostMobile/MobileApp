import {Component, ViewChild} from '@angular/core';
import {App, Navbar, NavParams, ViewController, AlertController, LoadingController, Events} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LclBookingPage} from "../lcl-booking/lcl-booking";
import {CourierBookingPage} from "../courier-booking/courier-booking";
import {ScheduleResultPage} from "../schedule-result/schedule-result";
import {UserData} from "../../providers/user-data";
import { Storage } from '@ionic/storage';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginPage {
  @ViewChild(Navbar) navbar : Navbar;
  submitted = false;
  page : any;
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
              public events: Events,
              public storage: Storage
            ) {
    this.page = this.navParam.data;
    this.authForm = formBuilder.group({
      'username':['',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z]*[0-9]*')])],
      'password':['',Validators.compose([Validators.minLength(5),Validators.required,Validators.pattern('[a-zA-Z]*[0-9]*')])]
    });
    this.username = this.authForm.controls['username'];
    this.password = this.authForm.controls['password'];
  }

  onLogin(username:string,password:string) {
    if(this.authForm.valid){
      let loading = this.loadingCtrl.create({
        content: "loggingIn...",
        duration: 3000
      });
      loading.present();
      this.authService.doLogin(username,password).subscribe(
        res => {
          let signin:boolean = res;
          if(signin == true){
            this.authService.getProfile().subscribe((res) => {
              console.log(res); //log check object but now get error
            });
            this.userData.login();
            console.log('login ok');
            if(this.page == LclBookingPage||this.page == CourierBookingPage) {
              this.viewCtrl.dismiss();
              this.app.getRootNav().push(this.page);
            }
            else {
              this.closemodal();
            }
          }else {
            console.log('login response data fail')
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
      console.log(username,password);
    }
  }

  closemodal() {
    this.viewCtrl.dismiss();
    if(this.app.getRootNav().getActive().component!=ScheduleResultPage){
      this.app.getRootNav().popToRoot();
    }
  }

}
