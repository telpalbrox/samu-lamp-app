import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DeviceSettingsPage } from '../pages/deviceSettings/DeviceSettings';
import { RGBPage } from '../pages/rgb/RGBPage';
import { BluetoothLampService } from '../services/BluetoothLampService';
import { BluetoothSerialService } from '../services/BluetoothSerialService';
import { SettingsService } from '../services/SettingsService';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DeviceSettingsPage,
    RGBPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DeviceSettingsPage,
    RGBPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsService,
    BluetoothSerialService,
    BluetoothLampService
  ]
})
export class AppModule {}
