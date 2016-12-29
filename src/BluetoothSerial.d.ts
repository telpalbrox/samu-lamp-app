interface BluetoothDevice {
    class: number;
    id: string;
    address: string;
    name: string;
}

interface BluetoothSerial {
    connect(macAddressOrUuid: string, connectSuccess?: Function, connectFailure?: Function);
    connectInsecure(macAddress: string, connectSuccess?: Function, connectFailure?: Function);
    disconnect(success?: Function, failure?: Function);
    write(data: string | number[] | ArrayBuffer | Uint8Array, success?: Function, failure?: Function);
    available(success?: (numBytes: number) => any, failure?: Function);
    read(success?: (data: string) => any, failure?: Function);
    readUntil(delimiter: string, success?: (data: string) => any, failure?: Function);
    subscribe(delimiter: string, success?: (data: string) => any, failure?: Function);
    unsubscribe(success?: Function, failure?: Function);
    subscribeRawData(success?: (data: ArrayBuffer) => any, failure?: Function);
    unsubscribeRawData(success?: Function, failure?: Function);
    clear(success?: Function, failure?: Function);
    list(success?: (devices: BluetoothDevice[]) => any, failure?: Function);
    isConnected(success?: Function, failure?: Function);
    isEnabled(success?: Function, failure?: Function);
    showBluetoothSettings();
    enable(success?: Function, failure?: Function);
    discoverUnpaired(success?: (devices: BluetoothDevice[]) => any, failure?: Function);
    setDeviceDiscoveredListener(listener: (device: BluetoothDevice) => any);
    clearDeviceDiscoveredListener();
    setName(name: string);
    setDiscoverable(discoverableDuration: number);
}

declare var bluetoothSerial: BluetoothSerial;
