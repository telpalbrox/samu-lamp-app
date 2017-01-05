import { Component, OnInit } from '@angular/core';

import { ToastController, LoadingController } from 'ionic-angular';

import { BluetoothSerialService } from '../../services/BluetoothSerialService';
import { SettingsService } from '../../services/SettingsService';
import { BluetoothLampService } from '../../services/BluetoothLampService';

@Component({
  templateUrl: 'DeviceSettings.html'
})
export class DeviceSettingsPage implements OnInit {
    private devices: BluetoothDevice[];
    private pairedDevice: BluetoothDevice = null;
    private isNotificationsActive = true;
    private isSoundActive = true;
    private isExpandedNotifications = true;

    constructor(
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private bluetoothSerialService: BluetoothSerialService,
        private settingsService: SettingsService,
        private bluetoothLampService: BluetoothLampService
    ) { }

    async ngOnInit() {
        this.isNotificationsActive = this.settingsService.isNotificationsActive();
        this.isSoundActive = this.settingsService.isSoundActive();
        this.isExpandedNotifications = this.settingsService.isExpandedNotifications();
        this.pairedDevice = this.settingsService.getDevice();
        const loading = this.loadingCtrl.create({
            content: 'Buscando dispositivos'
        });
        loading.present();
        this.devices = await this.bluetoothSerialService.list();
        loading.dismiss();
    }

    async deviceSelected(device: BluetoothDevice) {
        this.settingsService.setDevice(device);
        this.pairedDevice = device;
        const loading = this.loadingCtrl.create({
            content: 'Conectando con el dispositivo'
        });
        loading.present();
        try {
            await this.bluetoothSerialService.connect(device.address);
            const toast = this.toastCtrl.create({
                message: `${device.name} emparejado correctamente`,
                duration: 5000,
                showCloseButton: true
            });
            toast.present();
        } catch(error) {
            const toast = this.toastCtrl.create({
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
