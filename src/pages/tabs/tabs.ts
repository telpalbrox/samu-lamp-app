import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { RGBPage } from '../rgb/RGBPage';
import { MessagePage } from '../message/MessagePage';
import { AlarmPage } from '../alarm/AlarmPage';
import { SensorsPage } from '../sensors/SensorsPage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = RGBPage;
  tab3Root: any = MessagePage;
  tab4Root: any = AlarmPage;
  tab5Root: any = SensorsPage;

  constructor() {

  }
}
