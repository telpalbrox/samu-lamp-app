import { Component, OnInit, OnDestroy } from '@angular/core';

import { BluetoothLampService, SensorsInfo } from '../../services/BluetoothLampService';

@Component({
    selector: 'sm-sensors-page',
    templateUrl: 'SensorsPage.html'
})
export class SensorsPage implements OnInit {
    private info: SensorsInfo;

    constructor(public bluetoothLampService: BluetoothLampService) {

    }

    async ngOnInit() {
        this.info = bluetoothSerial.fake ? {
            temperature: 20,
            humidity: 50
        } : await this.bluetoothLampService.getSensorsInfo();
    }
}
