import { Component, OnInit } from '@angular/core';
import { BluetoothLampService, SensorsInfo } from 'src/app/services/bluetooth-lamp.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.page.html',
  styleUrls: ['./sensors.page.scss'],
})
export class SensorsPage implements OnInit {
  info: SensorsInfo;

  constructor(public bluetoothLampService: BluetoothLampService) { }

  async ngOnInit() {
    this.info = !window.cordova ? {
      temperature: 20,
      humidity: 50
    } : await this.bluetoothLampService.getSensorsInfo();
  }
}
