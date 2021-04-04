import { RegisterDeliveryFormComponent } from './layouts/views/register-delivery/register-delivery-form/register-delivery-form.component';
import { RegisterDeliveryListComponent } from './layouts/views/register-delivery/register-delivery-list/register-delivery-list.component';
import { AuthGuard } from './layouts/security/auth-guard/auth.guard';
import { AuthLayoutComponent } from './layouts/core/auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/core/admin-layout/admin-layout.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { ClientFormComponent } from './layouts/views/client/client-form/client-form.component';
import { ClientListComponent } from './layouts/views/client/client-list/client-list.component';
import { DashboardComponent } from './layouts/views/dashboard/dashboard.component';
import { UserFormComponent } from './layouts/views/user/user-form/user-form.component';
import { UserListComponent } from './layouts/views/user/user-list/user-list.component';

const routes: Routes = [
  // after login
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'user',
        component: UserListComponent
      },
      {
        path: 'user/form',
        component: UserFormComponent
      },
      {
        path: 'user/form/:id',
        component: UserFormComponent
      },
      {
        path: 'client',
        component: ClientListComponent
      },
      {
        path: 'client/form',
        component: ClientFormComponent
      },
      {
        path: 'client/form/:id',
        component: ClientFormComponent
      },
      {
        path: 'delivery',
        component: RegisterDeliveryListComponent
      },
      {
        path: 'delivery/form',
        component: RegisterDeliveryFormComponent
      },
    ]
  },
  {
    path: 'register',
    component: UserFormComponent
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./layouts/security/security.module').then(mod => mod.SecurityModule)
      }
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
