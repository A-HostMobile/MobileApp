import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';

/**
 * Generated class for the HowtoLclPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-howto-lcl',
  templateUrl: 'howto-lcl.html',
})
export class HowtoLclPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public plt: Platform) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowtoLclPage');
    this.checkPlatform();
  }


isIos: boolean;
checkPlatform(){
if (this.plt.is('ios')) {
      this.isIos = true;
    }
      else {
         this.isIos = false;
      }
      console.log("Platform is IOS: "+this.isIos);
}


}
