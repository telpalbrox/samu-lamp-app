import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { BluetoothSerialService } from '../services/BluetoothSerialService';
import { BluetoothLampService } from '../services/BluetoothLampService';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(
    platform: Platform,
    private alertCtrl: AlertController,
    private bluetoothSerialService: BluetoothSerialService,
    private bluetoothLampService: BluetoothLampService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.enableBT();
    });
  }

  async enableBT() {
    if (!await this.bluetoothSerialService.enable()) {
      this.bluetoothLampService.showEnableBluetoothAlert();
    }
  }
}
