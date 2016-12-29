import { Injectable } from "@angular/core";

@Injectable()
export class BluetoothSerialService {
    connect(macAddressOrUuid: string): Promise<undefined> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.connect(macAddressOrUuid, resolve, reject);
        });
    }

    connectInsecure(macAddress: string): Promise<undefined> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.connectInsecure(macAddress, resolve, reject);
        });
    }

    disconnect(): Promise<undefined> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.disconnect(resolve, reject);
        });
    }

    write(data: string | number[] | ArrayBuffer | Uint8Array): Promise<undefined> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.write(data, resolve, reject);
        });
    }

    available(): Promise<number> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.available(resolve, reject);
        });
    }

    read(): Promise<string> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.read(resolve, reject);
        });
    }

    readUntil(delimiter: string): Promise<undefined> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.readUntil(delimiter, reject);
        });
    }

    subscribe(delimiter: string): Promise<undefined> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.subscribe(delimiter, resolve, reject);
        });
    }

    unsubscribe(): Promise<undefined> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.unsubscribe(resolve, reject);
        });
    }

    subscribeRawData(): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.subscribeRawData(resolve, reject);
        });
    }

    unsubscribeRawData(): Promise<undefined> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.unsubscribeRawData(resolve, reject);
        });
    }

    clear(): Promise<undefined> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.clear(resolve, reject);
        });
    }

    list(): Promise<BluetoothDevice[]> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.list(resolve, reject);
        });
    }

    isConnected(): Promise<undefined> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.isConnected(resolve, reject);
        });
    }

    isEnabled(): Promise<undefined> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.isEnabled(resolve, reject);
        });
    }

    showBluetoothSettings() {
        bluetoothSerial.showBluetoothSettings();
    }

    enable(): Promise<undefined> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.enable(resolve, reject);
        });
    }

    discoverUnpaired(): Promise<BluetoothDevice[]> {
        return new Promise((resolve, reject) => {
            bluetoothSerial.discoverUnpaired(resolve, reject);
        });
    }

    setDeviceDiscoveredListener(listener: (device: BluetoothDevice) => any) {
        bluetoothSerial.setDeviceDiscoveredListener(listener);
    }

    clearDeviceDiscoveredListener() {
        bluetoothSerial.clearDeviceDiscoveredListener();
    }

    setName(name: string) {
        bluetoothSerial.setName(name);
    }

    setDiscoverable(discoverableDuration: number) {
        bluetoothSerial.setDiscoverable(discoverableDuration);
    }
}
