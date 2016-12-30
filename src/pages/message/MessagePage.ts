import { Component } from '@angular/core';

import { BluetoothLampService } from '../../services/BluetoothLampService';

@Component({
    selector: 'sm-message-page',
    templateUrl: 'MessagePage.html'
})
export class MessagePage {
    private message: string = '';

    constructor(public bluetoothLampService: BluetoothLampService) {

    }

    setMessage() {
        if (!this.message.trim()) {
            return;
        }
        this.bluetoothLampService.setMessage(this.message);
    }
}
