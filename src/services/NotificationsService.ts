import { Injectable } from "@angular/core";

import { BluetoothLampService } from './BluetoothLampService';

@Injectable()
export class NotificationsService {
    constructor(private bluetoothLampService: BluetoothLampService) {

    }

    bindEvent() {
        typeof notificationListener !== 'undefined' && notificationListener.listen(this.onNotification.bind(this));
    }

    onNotification(notification: Notification) {
        console.log('notification');
        console.log(notification);
        this.bluetoothLampService.sendNotification(notification);
    }
}
