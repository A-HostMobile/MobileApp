import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, ViewController , Slides} from 'ionic-angular';

@Component({
  selector: 'page-courier-booking',
  templateUrl: 'courier-booking.html',
})
export class CourierBookingPage {

  @ViewChild(Navbar,Slides) navbar: Navbar;slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourierBookingPage');
    this.navbar.backButtonClick = (e: UIEvent) => {
      if (this.viewCtrl.index == 0) {
        this.navCtrl.popToRoot().then(() => {
          this.navCtrl.first().dismiss();
        });
      }
      else {
        this.navCtrl.popToRoot();
      }
    }
  }

//  goToSlide() {
//     this.slides.slideTo(2, 500);
//   }


}

