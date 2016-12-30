import { Component, OnInit } from '@angular/core';

import { BluetoothLampService } from '../../services/BluetoothLampService';

@Component({
    selector: 'sm-rgb-page',
    templateUrl: 'RGBPage.html'
})
export class RGBPage implements OnInit {
    private color: string;
    private randomColor: boolean = false;

    constructor(public bluetoothLampService: BluetoothLampService) {

    }

    ngOnInit() {
        this.color = localStorage.getItem('color');
    }

    async setColor() {
        localStorage.setItem('color', this.color);
        this.bluetoothLampService.setRGBColor(this.color, this.randomColor);
    }
}
