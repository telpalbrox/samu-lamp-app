import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DeviceSettingsPage } from '../pages/deviceSettings/DeviceSettings';
import { RGBPage } from '../pages/rgb/RGBPage';
import { MessagePage } from '../pages/message/MessagePage';
import { DebugPage } from '../pages/debug/DebugPage';
import { SensorsPage } from '../pages/sensors/SensorsPage';
import { AlarmPage } from '../pages/alarm/AlarmPage';
import { BluetoothLampService } from '../services/BluetoothLampService';
import { BluetoothSerialService } from '../services/BluetoothSerialService';
import { SettingsService } from '../services/SettingsService';
import { NotificationsService } from '../services/NotificationsService';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    DeviceSettingsPage,
    RGBPage,
    MessagePage,
    AlarmPage,
    DebugPage,
    SensorsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    DeviceSettingsPage,
    RGBPage,
    MessagePage,
    AlarmPage,
    DebugPage,
    SensorsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsService,
    BluetoothSerialService,
    BluetoothLampService,
    NotificationsService
  ]
})
export class AppModule {}
