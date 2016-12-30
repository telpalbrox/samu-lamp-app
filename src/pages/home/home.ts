import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { DeviceSettingsPage } from '../deviceSettings/DeviceSettings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToSettingsPage() {
    this.navCtrl.push(DeviceSettingsPage);
  }
}
