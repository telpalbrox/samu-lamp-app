import { Component, ViewChild, ElementRef } from '@angular/core';

import { BluetoothLampService } from '../../services/BluetoothLampService';

@Component({
    selector: 'sm-alarm-page',
    templateUrl: 'AlarmPage.html'
})
export class AlarmPage {
    @ViewChild('timeInput') timeInputRef: ElementRef;
    private alarmTime: string = '';

    constructor(public bluetoothLampService: BluetoothLampService) {

    }

    setTime() {
        this.bluetoothLampService.setTime(this.getTimeFromDate(new Date()));
    }

    setAlarm() {
        this.bluetoothLampService.setAlarm(this.getTimeFromDate(this.timeInputRef.nativeElement.valueAsDate));
    }

    turnOffAlarm() {
        this.bluetoothLampService.turnOffAlarm();
    }

    getTimeFromDate(date: Date): string {
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
}
