import { Component, OnInit } from '@angular/core';

import { NavController, Tabs } from 'ionic-angular';

import { DeviceSettingsPage } from '../deviceSettings/DeviceSettings';
import { DebugPage } from '../debug/DebugPage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  private tabs: Tabs;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    this.tabs = (this.navCtrl.parent as Tabs);
  }

  goToSettingsPage() {
    this.navCtrl.push(DeviceSettingsPage);
  }

  goToRGBPage() {
    this.tabs.select(1);
  }

  goToMessagePage() {
    this.tabs.select(2);
  }

  goToAlarmPage() {
    this.tabs.select(3);
  }

  goToDebugPage() {
    this.navCtrl.push(DebugPage);
  }
}
