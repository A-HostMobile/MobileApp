import { Injectable } from '@angular/core';

import { Events, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserData {

  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(
    public events: Events,
    public storage: Storage,
    public platform: Platform
  ) {}

  login(profile:any): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login',profile);
  };

  logout(): void {
    if(this.platform.is('cordova')){
      this.events.publish('FCMDelete');
    }
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };
}
