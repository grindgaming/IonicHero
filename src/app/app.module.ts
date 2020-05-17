import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage';
import {ShopPageModule} from './shop/shop.module';
import {TutorialPageModule} from './tutorial/tutorial.module';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx'; 
// import * as Sentry from "@sentry/browser";

// Sentry.init({
//   dsn: "https://f9feb058c17f4e888a697169f095c6f4@o252522.ingest.sentry.io/5207752"
// });

// @Injectable()
// export class SentryErrorHandler implements ErrorHandler {
//   constructor() { }
//   handleError(error) {
//     const eventId = Sentry.captureException(error.originalError || error);
//     Sentry.showReportDialog({ eventId });
//   }
// }

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ShopPageModule,
    TutorialPageModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    NativePageTransitions,
    { provide: RouteReuseStrategy, useClass:  IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
