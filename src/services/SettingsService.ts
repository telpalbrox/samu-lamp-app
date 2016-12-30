import { Injectable } from "@angular/core";

@Injectable()
export class SettingsService {
    setDevice(device: BluetoothDevice) {
        localStorage.setItem('device', JSON.stringify(device));
    }

    getDevice(): BluetoothDevice {
        const deviceString = localStorage.getItem('device');
        if (!deviceString) {
            return null;
        }
        return JSON.parse(deviceString);
    }
}