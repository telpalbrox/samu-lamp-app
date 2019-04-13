import { Injectable } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private backgroundMode: BackgroundMode) {

  }

  setDevice(device: BluetoothDevice) {
    localStorage.setItem('device', JSON.stringify(device));
  }

  getDevice(): BluetoothDevice {
    const deviceString = localStorage.getItem('device');
    if (!deviceString) {
      return null;
    }
    return JSON.parse(deviceString);
  }

  setDefaultSettings() {
    const notificationsActive = localStorage.getItem('notificationsActive');
    notificationsActive || localStorage.setItem('notificationsActive', 'true');
    const soundActive = localStorage.getItem('soundActive');
    soundActive || localStorage.setItem('soundActive', 'true');
    const expandedNotifications = localStorage.getItem('expandedNotifications');
    expandedNotifications || localStorage.setItem('expandedNotifications', 'true');
    if (typeof cordova !== 'undefined') {
      this.backgroundMode.setDefaults({
        text: 'Enviando notificationes...'
      });
      this.setNotificationsActive(this.isNotificationsActive());
    }
  }

  setNotificationsActive(notificationsActive: boolean) {
    if (typeof cordova !== 'undefined') {
      if (notificationsActive) {
        this.backgroundMode.enable();
      } else {
        this.backgroundMode.disable();
      }
    }
    localStorage.setItem('notificationsActive', '' + notificationsActive);
  }

  isNotificationsActive(): boolean {
    return localStorage.getItem('notificationsActive') === 'true';
  }

  setSoundActive(soundActive: boolean) {
    localStorage.setItem('soundActive', '' + soundActive);
  }

  isSoundActive(): boolean {
    return localStorage.getItem('soundActive') === 'true';
  }

  setExpandedNotifications(expandedNotifications: boolean) {
    localStorage.setItem('expandedNotifications', '' + expandedNotifications);
  }

  isExpandedNotifications(): boolean {
    return localStorage.getItem('notificationsActive') === 'true';
  }
}
