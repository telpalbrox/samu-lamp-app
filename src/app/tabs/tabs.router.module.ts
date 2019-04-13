import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../pages/home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'rgb',
        children: [
          {
            path: '',
            loadChildren: '../pages/rgb/rgb.module#RgbPageModule'
          }
        ]
      },
      {
        path: 'alarm',
        children: [
          {
            path: '',
            loadChildren: '../pages/alarm/alarm.module#AlarmPageModule'
          }
        ]
      },
      {
        path: 'message',
        children: [
          {
            path: '',
            loadChildren: '../pages/message/message.module#MessagePageModule'
          }
        ]
      },
      {
        path: 'sensors',
        children: [
          {
            path: '',
            loadChildren: '../pages/sensors/sensors.module#SensorsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
