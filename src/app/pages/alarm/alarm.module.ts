import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlarmPage } from './alarm.page';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { SettingsService } from 'src/app/services/settings.service';
import { BluetoothLampService } from 'src/app/services/bluetooth-lamp.service';

const routes: Routes = [
  {
    path: '',
    component: AlarmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlarmPage],
  providers: [
    BackgroundMode,
    BluetoothSerial,
    SettingsService,
    BluetoothLampService
  ]
})
export class AlarmPageModule {}
