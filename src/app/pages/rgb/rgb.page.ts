import { Component } from '@angular/core';
import { BluetoothLampService } from 'src/app/services/bluetooth-lamp.service';

@Component({
  selector: 'app-rgb',
  templateUrl: 'rgb.page.html',
  styleUrls: ['rgb.page.scss']
})
export class RgbPage {
  color: string;
  randomColor: boolean = false;

  constructor(public bluetoothLampService: BluetoothLampService) { }

  ngOnInit() {
    this.color = localStorage.getItem('color') || '#000000';
  }

  async setColor() {
    localStorage.setItem('color', this.color);
    this.bluetoothLampService.setRGBColor(this.color, this.randomColor);
  }
}
