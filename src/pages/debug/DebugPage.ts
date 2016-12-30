import { Component } from '@angular/core';

import { BluetoothLampService } from '../../services/BluetoothLampService';

@Component({
    selector: 'sm-debug-page',
    templateUrl: 'DebugPage.html'
})
export class DebugPage {
    private message: string = '';

    constructor(public bluetoothLampService: BluetoothLampService) {

    }

    sendMessage() {
        this.bluetoothLampService.send(this.message);
    }
}
