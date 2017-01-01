import { Component } from '@angular/core';
import { Platform, AlertController, Alert } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { BluetoothSerialService } from '../services/BluetoothSerialService';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  private bluetoothAlert: Alert;

  constructor(
    platform: Platform,
    private alertCtrl: AlertController,
    private bluetoothSerialService: BluetoothSerialService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.bluetoothAlert = alertCtrl.create({
        title: 'Bluetooth',
        message: 'Es necesario activar el Bluetooth para poder usar la aplicación',
        buttons: [{
          text: 'Activar Bluetooth',
          handler: () => {
            this.bluetoothSerialService.enable().then((enabled) => {
              enabled && this.bluetoothAlert.dismiss();
            });
            return false;
          }
        }]
      });
      this.enableBT();
    });
  }

  async enableBT() {
    if (!await this.bluetoothSerialService.enable()) {
      this.bluetoothAlert.present();
    }
  }
}
