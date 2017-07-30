import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, XHRBackend } from "@angular/http";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule, Storage } from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from "../pages/login/login";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JwtClientProvider } from '../providers/jwt-client/jwt-client';
import { AuthConfig, AuthHttp, JwtHelper } from "angular2-jwt";
import { AuthProvider } from '../providers/auth/auth';
import { DefaultXHRBackendProvider } from '../providers/default-xhr-backend/default-xhr-backend';
import { Env } from "../models/env";
import { RedirectorProvider } from '../providers/redirector/redirector';
import { Facebook } from "@ionic-native/facebook";
import { UserResourceProvider } from '../providers/resource/user-resource';
import {MySettingsPage} from "../pages/my-settings/my-settings";


declare  var ENV:Env;

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    MySettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{},{
      links: [
        {component: LoginPage, name: 'LoginPage', segment: 'login'},
        {component: HomePage, name: 'HomePage', segment: 'home'},
        {component: MySettingsPage, name: 'HomePage', segment: 'my-settings'}
  ]
    }),
    IonicStorageModule.forRoot({
      driverOrder: ['localstorage']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    MySettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    JwtClientProvider,
    JwtHelper,
    AuthProvider,
    RedirectorProvider,
    UserResourceProvider,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: AuthHttp,
      deps: [Http, Storage],
      useFactory(http, storage){
        let authConfig = new AuthConfig({
            headerPrefix: 'Bearer',
            noJwtError: true,
            noClientCheck: true,
            tokenGetter: (() => storage.get(ENV.TOKEN_NAME))
        });
        return new AuthHttp(authConfig,http);
      }
    },
    {provide: XHRBackend, useClass: DefaultXHRBackendProvider}
  ]
})
export class AppModule {}
