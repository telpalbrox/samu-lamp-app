import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeviceSettingsPage } from './device-settings.page';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { SettingsService } from 'src/app/services/settings.service';
import { BluetoothLampService } from 'src/app/services/bluetooth-lamp.service';

const routes: Routes = [
  {
    path: '',
    component: DeviceSettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeviceSettingsPage],
  providers: [
    BackgroundMode,
    BluetoothSerial,
    SettingsService,
    BluetoothLampService
  ]
})
export class DeviceSettingsPageModule {}
