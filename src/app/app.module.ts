import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
// import { NzUploadModule } from 'ng-zorro-antd/upload';
;
// import { nz } from 'ng-zorro-antd/';



import { userComponent } from './Components/user/user.component';
import { CommisComponent } from './Components/commis/commis.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashComponent } from './Components/dash/dash.component';
import { RegisterComponent } from './Components/register/register.component';
import { RequestComponent } from './Components/request/request.component';
import { RequeststepregComponent } from './Components/requeststepreg/requeststepreg.component';
import { RqmainComponent } from './Components/rqmain/rqmain.component';
import { RqoposComponent } from './Components/rqopos/rqopos.component';
import { RqeinfoComponent } from './Components/rqeinfo/rqeinfo.component';
import { RqfileComponent } from './Components/rqfile/rqfile.component';
import { SetfileComponent } from './Components/setfile/setfile.component';


registerLocaleData(en);
export function tokenGetter()
{
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    userComponent,
    CommisComponent,
    LoginComponent,
    DashComponent,
    RegisterComponent,
    RequestComponent,
    RequeststepregComponent,
    RqmainComponent,
    RqoposComponent,
    RqeinfoComponent,
    RqfileComponent,
    SetfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzToolTipModule,
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzDropDownModule,
    NzAlertModule,
    NzModalModule,
    NzSelectModule,
    NzStepsModule,
    NzDatePickerModule,
    NzRadioModule,
    NzSpaceModule,
    NzDividerModule,
    //NzUploadModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),

  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
