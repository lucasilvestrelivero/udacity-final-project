import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenericModule } from './generic.module';
import { AbstractModule } from './layouts/abstract/abstract.module';
import { AdminLayoutComponent } from './layouts/core/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/core/auth-layout/auth-layout.component';
import { NavbarComponent } from './layouts/core/navigation/navbar/navbar.component';
import { SidebarComponent } from './layouts/core/navigation/sidebar/sidebar.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { JwtInterceptorService } from './layouts/security/auth-interceptor/jwt-interceptor.service';
import { SecurityModule } from './layouts/security/security.module';
import { ClientFormComponent } from './layouts/views/client/client-form/client-form.component';
import { ClientListComponent } from './layouts/views/client/client-list/client-list.component';
import { DashboardComponent } from './layouts/views/dashboard/dashboard.component';
import {
  RegisterDeliveryFormComponent,
} from './layouts/views/register-delivery/register-delivery-form/register-delivery-form.component';
import {
  RegisterDeliveryListComponent,
} from './layouts/views/register-delivery/register-delivery-list/register-delivery-list.component';
import {
  RegisterDeliveryViewDialogComponent,
} from './layouts/views/register-delivery/register-delivery-view/register-delivery-view.component';
import { ViewFileDialogComponent } from './layouts/views/register-delivery/view-file/view-file.component';
import { UserFormComponent } from './layouts/views/user/user-form/user-form.component';
import { UserListComponent } from './layouts/views/user/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DashboardComponent,
    UserListComponent,
    UserFormComponent,
    ClientFormComponent,
    ClientListComponent,
    RegisterDeliveryFormComponent,
    RegisterDeliveryListComponent,
    RegisterDeliveryViewDialogComponent,
    ViewFileDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AbstractModule,
    SecurityModule,
    GenericModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  ],
  entryComponents: [RegisterDeliveryViewDialogComponent, ViewFileDialogComponent]
})
export class AppModule {}
