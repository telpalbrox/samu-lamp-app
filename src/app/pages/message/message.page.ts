import { Component, OnInit } from '@angular/core';
import { BluetoothLampService } from 'src/app/services/bluetooth-lamp.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage {
  message: string = '';

  constructor(public bluetoothLampService: BluetoothLampService) { }

  setMessage() {
    if (!this.message.trim()) {
      return;
    }
    this.bluetoothLampService.setMessage(this.message);
  }
}
