import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, XHRBackend } from "@angular/http";
import { TextMaskModule } from "angular2-text-mask";
import { MomentModule } from "angular2-moment";
import 'moment/locale/pt-br';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule, Storage } from "@ionic/storage";

import { Facebook } from "@ionic-native/facebook";

import { MyApp } from './app.component';
import { AddCpfPage } from "../pages/add-cpf/add-cpf";
import { HomePage } from '../pages/home/home';
import { HomeSubscriberPage } from "../pages/home-subscriber/home-subscriber";
import { ListPage } from '../pages/list/list';
import { LoginPage } from "../pages/login/login";
import { MySettingsPage } from "../pages/my-settings/my-settings";
import { PlansPage } from "../pages/plans/plans";
import { PaymentPage } from "../pages/payment/payment";
import { VideoPlayPage } from "../pages/video-play/video-play";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JwtClientProvider } from '../providers/jwt-client/jwt-client';
import { AuthConfig, AuthHttp, JwtHelper } from "angular2-jwt";
import { AuthProvider } from '../providers/auth/auth';
import { DefaultXHRBackendProvider } from '../providers/default-xhr-backend/default-xhr-backend';
import { RedirectorProvider } from '../providers/redirector/redirector';
import { UserResourceProvider } from '../providers/resource/user.resource';
import { PlanResource } from '../providers/resource/plan.resource';
import { VideoResource } from "../providers/resource/video.resource";
import { PaymentResource } from '../providers/resource/payment.resource';
import { StreamingMedia } from "@ionic-native/streaming-media";
import { SQLite } from "@ionic-native/sqlite";
import { SQLitePorter } from "@ionic-native/sqlite-porter";
import { DB } from "../providers/sqlite/db";
import { Env } from "../models/env";

declare  var ENV:Env;

@NgModule({
  declarations: [
    MyApp,
    AddCpfPage,
    HomePage,
    HomeSubscriberPage,
    ListPage,
    LoginPage,
    MySettingsPage,
    PaymentPage,
    PlansPage,
    VideoPlayPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TextMaskModule,
    MomentModule,
    IonicModule.forRoot(MyApp,{},{
      links: [
        {component: AddCpfPage, name: 'AddCpfPage', segment: 'add-cpf'},
        {component: HomePage, name: 'HomePage', segment: 'home'},
        {component: HomeSubscriberPage, name: 'HomeSubscriberPage', segment: 'subscriber/home'},
        {component: LoginPage, name: 'LoginPage', segment: 'login'},
        {component: MySettingsPage, name: 'HomePage', segment: 'my-settings'},
        {component: PaymentPage, name: 'PaymentPage', segment: 'plan/:plan/payment'},
        {component: PlansPage, name: 'PlansPage', segment: 'plans'},
        {component: VideoPlayPage, name: 'VideoPlayPage', segment: 'videos/:video/play'},
  ]
    }),
    IonicStorageModule.forRoot({
      driverOrder: ['localstorage']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddCpfPage,
    HomePage,
    HomeSubscriberPage,
    ListPage,
    LoginPage,
    MySettingsPage,
    PaymentPage,
    PlansPage,
    VideoPlayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    JwtClientProvider,
    JwtHelper,
    AuthProvider,
    RedirectorProvider,
    UserResourceProvider,
    PlanResource,
    VideoResource,
    PaymentResource,
    Facebook,
    StreamingMedia,
    SQLite,
    SQLitePorter,
    DB,
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
