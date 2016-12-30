import { Injectable } from "@angular/core";

import { BluetoothSerialService } from './BluetoothSerialService';
import { SettingsService } from './SettingsService';

interface RGB {
    r: number;
    g: number;
    b: number;
}

@Injectable()
export class BluetoothLampService {
    constructor(
        private bluetoothSerialService: BluetoothSerialService,
        private settingsService: SettingsService
    ) { }

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

    private async connect() {
        if (await this.bluetoothSerialService.isConnected()) {
            return;
        }

        const device = this.settingsService.getDevice();
        if (!device) {
            throw new Error('There is not configured device!');
        }

        this.bluetoothSerialService.connect(device.address);
    }

    async send(data: string) {
        await this.connect();
        this.bluetoothSerialService.write(data);
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
