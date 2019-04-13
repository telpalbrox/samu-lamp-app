import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RgbPage } from './rgb.page';
import { BluetoothLampService } from 'src/app/services/bluetooth-lamp.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { SettingsService } from 'src/app/services/settings.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: RgbPage }])
  ],
  declarations: [RgbPage],
  providers: [
    BackgroundMode,
    BluetoothSerial,
    SettingsService,
    BluetoothLampService
  ]
})
export class RgbPageModule {}
