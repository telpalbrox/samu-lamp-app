import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings.service';
import { BluetoothLampService } from 'src/app/services/bluetooth-lamp.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-device-settings',
  templateUrl: './device-settings.page.html',
  styleUrls: ['./device-settings.page.scss'],
})
export class DeviceSettingsPage implements OnInit {
  devices: BluetoothDevice[];
  pairedDevice: BluetoothDevice = null;
  isNotificationsActive = true;
  isSoundActive = true;
  isExpandedNotifications = true;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private bluetoothSerialService: BluetoothSerial,
    private settingsService: SettingsService,
    private bluetoothLampService: BluetoothLampService
  ) { }

  async ngOnInit() {
    this.isNotificationsActive = this.settingsService.isNotificationsActive();
    this.isSoundActive = this.settingsService.isSoundActive();
    this.isExpandedNotifications = this.settingsService.isExpandedNotifications();
    this.pairedDevice = this.settingsService.getDevice();
    const loading = await this.loadingCtrl.create({
      message: 'Buscando dispositivos'
    });
    loading.present();
    this.devices = await this.bluetoothSerialService.list();
    loading.dismiss();
  }

  async deviceSelected(device: BluetoothDevice) {
    this.settingsService.setDevice(device);
    this.pairedDevice = device;
    const loading = await this.loadingCtrl.create({
      message: 'Conectando con el dispositivo'
    });
    await loading.present();
    try {
      await this.bluetoothSerialService.connect(device.address);
      const toast = await this.toastCtrl.create({
        message: `${device.name} emparejado correctamente`,
        duration: 5000,
        showCloseButton: true
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: `Error conectando con ${device.name}`,
        duration: 5000,
        showCloseButton: true
      });
      toast.present();
      console.error(error);
    }
    loading.dismiss();
  }

  async setSoundActive() {
    await this.bluetoothLampService.setSoundActive(this.isSoundActive);
    this.settingsService.setSoundActive(this.isSoundActive);
  }

  setNotificationActive() {
    this.settingsService.setNotificationsActive(this.isNotificationsActive);
  }

  setExpandedNotifications() {
    this.settingsService.setExpandedNotifications(this.isExpandedNotifications);
  }
}
