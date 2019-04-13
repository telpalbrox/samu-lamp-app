import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { SettingsService } from './settings.service';

export interface SensorsInfo {
  temperature: number;
  humidity: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

@Injectable({
  providedIn: 'root'
})
export class BluetoothLampService {
  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private bluetoothSerial: BluetoothSerial,
    private settings: SettingsService
  ) {
  }

  private async showNotConfiguredDeviceAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Dispositivo no configurado',
      message: 'Debes configurar el dispositivo para un correcto funcionamiento de la aplicación',
      buttons: [{
        text: 'Configurar dispositivo',
        handler: () => {
          this.router.navigateByUrl('/tabs/tabs2');
        }
      }]
    });
    await alert.present();
  }

  private getLoadingSpinner() {
    return this.loadingCtrl.create({
      message: 'Conectando con el dispositivo'
    });
  }

  showEnableBluetoothAlert() {
    return new Promise(async (resolve, reject) => {
      const bluetoothAlert = await this.alertCtrl.create({
        header: 'Bluetooth',
        message: 'Es necesario activar el Bluetooth para poder usar la aplicación',
        backdropDismiss: false,
        buttons: [{
          text: 'Activar Bluetooth',
          handler: async () => {
            const enabled = await this.bluetoothSerial.enable();
            if (enabled) {
              await bluetoothAlert.dismiss();
              resolve();
            }
            return false;
          }
        }]
      });
    });
  }

  private async connect(showUI: boolean = true) {
    if (showUI && !await this.bluetoothSerial.enable()) {
      await this.showEnableBluetoothAlert();
    }

    if (await this.bluetoothSerial.isConnected()) {
      return;
    }

    const device = this.settings.getDevice();
    if (!device) {
      showUI && this.showNotConfiguredDeviceAlert();
      throw new Error('There is not configured device!');
    }

    const loadingSpinner = await this.getLoadingSpinner();
    try {
      showUI && await loadingSpinner.present();
      await this.bluetoothSerial.connect(device.address);
      showUI && await loadingSpinner.dismiss();
    } catch (error) {
      if (showUI) {
        const toast = await this.toastCtrl.create({
          message: `Error conectando con ${device.name}`,
          duration: 5000,
          showCloseButton: true
        });
        await toast.present();
        await loadingSpinner.dismiss();
      }
      throw error;
    }
  }

  async send(data: string) {
    await this.connect();
    await this.bluetoothSerial.write(data);
  }

  async setRGBColor(color: string, random?: boolean) {
    await this.connect();
    if (random) {
      await this.bluetoothSerial.write('color random');
      return;
    }
    const { r, g, b } = hexToRgb(color);
    await this.bluetoothSerial.write(`color ${r} ${g} ${b}`);
  }
  async setMessage(message: string) {
    await this.connect();
    await this.bluetoothSerial.write(`message ${message}`);
  }

  async setTime(time: string) {
    await this.connect();
    await this.bluetoothSerial.write(`time ${time}`);
  }

  async setAlarm(time: string) {
    await this.connect();
    await this.bluetoothSerial.write(`setalarm ${time}`);
  }

  async turnOffAlarm() {
    await this.connect();
    await this.bluetoothSerial.write(`turnoffalarm`);
  }

  async getSensorsInfo(): Promise<SensorsInfo> {
    await this.connect();
    await this.bluetoothSerial.write('sensors');
    const data: string = await this.bluetoothSerial.read();
    const infoArray = data.split(' ').shift();
    return {
      temperature: parseFloat(infoArray[0]),
      humidity: parseFloat(infoArray[1])
    };
  }


  async sendNotification(notification: CordovaNotification) {
    if (!this.settings.isNotificationsActive()) {
      return;
    }
    await this.connect(false);
    await this.bluetoothSerial.write(`notification 0 0 255 ${notification.appName}: ${notification.title} ${notification.text} ${notification.textLines}`.trim());
  }

  async setSoundActive(soundActive: boolean) {
    await this.connect();
    const command = soundActive ? 'soundon' : 'soundoff';
    await this.bluetoothSerial.write(command);
  }
}

function componentToHex(c: number): string {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
