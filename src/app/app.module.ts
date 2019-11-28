import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import { HttpClientModule, } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { NgZorroAntdModule,NZ_ICONS, zh_CN} from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {SimpleReuseStrategy}from '../service/SimpleReuseStrategy';
import { RouteReuseStrategy } from '@angular/router';

import {MyserviceService} from '../service/myserice.service';
import {AuthService} from '../service/AuthService';

import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AboutComponent } from './components/about/about.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { TabComponentsComponent } from './components/tab-components/tab-components.component';

import zh from '@angular/common/locales/zh';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';

import { DelonAuthModule, SimpleInterceptor } from '@delon/auth';
import { DelonACLModule } from '@delon/acl';
registerLocaleData(en);


const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    // EmployeeBonusScoreComponent,
    // EmployeePlatformScoreComponent,
    AboutComponent,
    NotificationComponent,
    LogoutComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    TabComponentsComponent,
    HeaderComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    DelonAuthModule.forRoot(),
    DelonACLModule.forRoot(),
  ],
  providers   :[
    MyserviceService,
    AuthService,
    SimpleInterceptor,
    { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy },
    { provide:NZ_I18N, useValue: zh_CN }, { provide: NZ_ICONS, useValue: icons } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
