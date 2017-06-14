import {Component, ViewChild} from '@angular/core';
import {App, Navbar, NavParams, ViewController} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LclBookingPage} from "../lcl-booking/lcl-booking";
import {CourierBookingPage} from "../courier-booking/courier-booking";
import {ScheduleResultPage} from "../schedule-result/schedule-result";
import {UserData} from "../../providers/user-data";

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
              public formBuilder: FormBuilder) {
    this.page = this.navParam.data;
    this.authForm = formBuilder.group({
      'username':['',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z]*[0-9]*')])],
      'password':['',Validators.compose([Validators.minLength(6),Validators.required,Validators.pattern('[a-zA-Z]*[0-9]*')])]
    });
    this.username = this.authForm.controls['username'];
    this.password = this.authForm.controls['password'];
  }

  onLogin(usn:string,pass:string) {
    if(this.authForm.valid){
      this.userData.login(usn,pass);
      if(this.page == LclBookingPage||this.page == CourierBookingPage) {
        this.viewCtrl.dismiss();
        this.app.getRootNav().push(this.page);
      }
      else {
        this.closemodal();
      }
      console.log()
    }
  }

  closemodal() {
    this.viewCtrl.dismiss();
    if(this.app.getRootNav().getActive().component!=ScheduleResultPage){
      this.app.getRootNav().popToRoot();
    }
  }

  message(text: string){
    return
  }

}
