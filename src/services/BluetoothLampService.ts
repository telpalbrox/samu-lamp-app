import { Injectable } from "@angular/core";
import { AlertController, Alert, App, ToastController, Loading, LoadingController } from 'ionic-angular';

import { BluetoothSerialService } from './BluetoothSerialService';
import { SettingsService } from './SettingsService';
import { DeviceSettingsPage } from '../pages/deviceSettings/DeviceSettings';

export interface SensorsInfo {
    temperature: number;
    humidity: number;
}

interface RGB {
    r: number;
    g: number;
    b: number;
}

@Injectable()
export class BluetoothLampService {
    private deviceNotConfiguredAlert: Alert;
    private loadingSpinner: Loading;

    constructor(
        private app: App,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        public toastCtrl: ToastController,
        private bluetoothSerialService: BluetoothSerialService,
        private settingsService: SettingsService
    ) {
        this.deviceNotConfiguredAlert = this.alertCtrl.create({
            title: 'Dispositivo no configurado',
            message: 'Debes configurar el dispositivo para un correcto funcionamiento de la aplicación',
            buttons: [{
                text: 'Configurar dispositivo',
                handler: () => {
                    this.app.getActiveNav().push(DeviceSettingsPage);
                }
            }]
        });
        this.loadingSpinner = this.loadingCtrl.create({
            content: 'Conectando con el dispositivo'
        });
    }

    async setRGBColor(color: string, random?: boolean) {
        await this.connect();
        if (random) {
            await this.bluetoothSerialService.write('random');
            return;
        }
        const { r, g, b } = hexToRgb(color);
        await this.bluetoothSerialService.write(`color ${r} ${g} ${b}`);
    }

    async setMessage(message: string) {
        await this.connect();
        this.bluetoothSerialService.write(`message ${message}`);
    }

    async setTime(time: string) {
        await this.connect();
        this.bluetoothSerialService.write(`time ${time}`);
    }

    async setAlarm(time: string) {
        await this.connect();
        this.bluetoothSerialService.write(`setalarm ${time}`);
    }

    async turnOffAlarm() {
        await this.connect();
        this.bluetoothSerialService.write(`turnoffalarm`);
    }

    async getSensorsInfo(): Promise<SensorsInfo> {
        await this.connect();
        await this.bluetoothSerialService.write('sensors');
        const data = await this.bluetoothSerialService.read();
        const infoArray = data.split(' ').shift();
        return {
            temperature: parseFloat(infoArray[0]),
            humidity: parseFloat(infoArray[1])
        };
    }

    async send(data: string) {
        await this.connect();
        this.bluetoothSerialService.write(data);
    }

    showEnableBluetoothAlert() {
        return new Promise((resolve) => {
            const bluetoothAlert = this.alertCtrl.create({
                title: 'Bluetooth',
                message: 'Es necesario activar el Bluetooth para poder usar la aplicación',
                enableBackdropDismiss: false,
                buttons: [{
                    text: 'Activar Bluetooth',
                    handler: () => {
                        this.bluetoothSerialService.enable().then((enabled) => {
                            if (enabled) {
                                bluetoothAlert.dismiss();
                                resolve();
                            }
                        });
                        return false;
                    }
                }]
            });

            bluetoothAlert.present();
        });
    }

    async sendNotification(notification: Notification) {
        await this.connect(false);
        await this.bluetoothSerialService.write(`notification 0 0 0 ${notification.text}`);
    }

    private async connect(showUI: boolean = true) {
        if (showUI && !await this.bluetoothSerialService.enable()) {
            showUI && await this.showEnableBluetoothAlert();
        }

        if (await this.bluetoothSerialService.isConnected()) {
            return;
        }

        const device = this.settingsService.getDevice();
        if (!device) {
            showUI && this.deviceNotConfiguredAlert.present();
            throw new Error('There is not configured device!');
        }

        try {
            showUI && this.loadingSpinner.present();
            await this.bluetoothSerialService.connect(device.address);
            showUI && this.loadingSpinner.dismiss();
        } catch(error) {
            showUI && this.toastCtrl.create({
                message: `Error conectando con ${device.name}`,
                duration: 5000,
                showCloseButton: true
            }).present();
            showUI && this.loadingSpinner.dismiss();
            throw error;
        }
    }
}

function componentToHex(c: number): string {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// tslint:disable-next-line
function rgbToHex(r: number, g: number, b: number): string {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex: string): RGB {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
