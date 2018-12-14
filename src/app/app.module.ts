import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { NewPlanPage } from '../pages/newPlan/newPlan';
import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    NewPlanPage,
    MapPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewPlanPage,
    MapPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMaps,
    NativeStorage
  ]
  
})
export class AppModule {}
