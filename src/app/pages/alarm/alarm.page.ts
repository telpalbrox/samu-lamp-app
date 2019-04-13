import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BluetoothLampService } from 'src/app/services/bluetooth-lamp.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.page.html',
  styleUrls: ['./alarm.page.scss'],
})
export class AlarmPage {
  @ViewChild('timeInput') timeInputRef: ElementRef;

  constructor(public bluetoothLampService: BluetoothLampService) { }

  setTime() {
    this.bluetoothLampService.setTime(this.getTimeFromDate(new Date()));
  }

  setAlarm() {
    const alarmDate: Date = new Date(this.timeInputRef.nativeElement.valueAsDate);
    alarmDate.setHours(alarmDate.getHours() - 1);
    this.bluetoothLampService.setAlarm(this.getTimeFromDate(alarmDate));
  }

  turnOffAlarm() {
    this.bluetoothLampService.turnOffAlarm();
  }

  getTimeFromDate(date: Date): string {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
