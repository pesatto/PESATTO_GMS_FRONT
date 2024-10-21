import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './home/index/index.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import {GridModule, SidebarModule, FormModule, DropdownModule, AvatarModule, HeaderModule, CardModule, ButtonModule, TableModule, CalloutModule, ProgressModule, SpinnerModule, ToastModule, BadgeModule, ListGroupModule, AlertModule, ModalModule, ButtonGroupModule, BorderDirective} from '@coreui/angular-pro'
import {NgScrollbarModule} from 'ngx-scrollbar';
import { HeaderComponent } from './layout/header/header.component'
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { IconDirective, IconModule, IconSetService } from '@coreui/icons-angular';
import { ListComponent } from './home/list/list.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { UnitComponent } from './home/unit/unit.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModelsComponent } from './home/models/models.component';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { UsersComponent } from './home/users/users.component';
import { CompanyComponent } from './home/company/company.component';
import { httpInterceptor } from './service/http.interceptor';
import { UnitShareComponent } from './unit-share/unit-share.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    ListComponent,
    UnitComponent,
    LoginComponent,
    RegisterComponent,
    ModelsComponent,
    UsersComponent,
    CompanyComponent,
    UnitShareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    SidebarModule,
    NgScrollbarModule,
    FormModule,
    DropdownModule,
    AvatarModule,
    HeaderModule,
    BrowserAnimationsModule,
    IconModule,
    IconDirective,
    CardModule,
    ButtonModule,
    TableModule,
    CalloutModule,
    ProgressModule,
    SpinnerModule,
    HttpClientModule,
    ToastModule,
    BadgeModule,
    ListGroupModule,
    ReactiveFormsModule,
    ModalModule,
    AlertModule,
    ToastrModule.forRoot(), // ToastrModule added
    ButtonGroupModule,
    BorderDirective,
  ],
  providers: [
    provideHttpClient(withInterceptors([httpInterceptor])),
    IconSetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
