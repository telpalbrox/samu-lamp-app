import { Component, OnInit } from '@angular/core';

import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { BluetoothSerialService } from '../../services/BluetoothSerialService';
import { SettingsService } from '../../services/SettingsService';

@Component({
  templateUrl: 'DeviceSettings.html'
})
export class DeviceSettingsPage implements OnInit {
    private devices: BluetoothDevice[];
    private pairedDevice: BluetoothDevice = null;

    constructor(
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public bluetoothSerialService: BluetoothSerialService,
        public settingsService: SettingsService
    ) { }

    async ngOnInit() {
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
                duration: 2000,
                showCloseButton: true
            });
            toast.present();
        } catch(error) {
            const toast = this.toastCtrl.create({
                message: `Error conectando con ${device.name}`,
                duration: 2000,
                showCloseButton: true
            });
            toast.present();
            console.error(error);
        }
        loading.dismiss();        
    }
}
