import { Component } from '@angular/core';

import { NavController, Tabs } from 'ionic-angular';

import { DeviceSettingsPage } from '../deviceSettings/DeviceSettings';
import { RGBPage } from '../rgb/RGBPage';

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

  goToRGBPage() {
    (this.navCtrl.parent as Tabs).select(1);
  }
}
