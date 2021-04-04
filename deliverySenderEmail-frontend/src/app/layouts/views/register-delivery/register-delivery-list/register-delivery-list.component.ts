import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AbstractListComponent } from 'src/app/layouts/abstract/abstract-component/abstract-list';

import { RegisterDelivery } from './../../../../model/register-delivery.model';
import { RegisterDeliveryService } from './../../../../services/register-delivery.service';
import { RegisterDeliveryViewDialogComponent } from './../register-delivery-view/register-delivery-view.component';


@Component({
  selector: 'app-register-delivery-list',
  templateUrl: './register-delivery-list.component.html',
  styleUrls: ['./register-delivery-list.component.css']
})
export class RegisterDeliveryListComponent extends AbstractListComponent<RegisterDelivery, RegisterDeliveryService> {

  constructor(
    service: RegisterDeliveryService,
    router: Router,
    dialog: MatDialog,
    snack: MatSnackBar
  ) {
    super(service, router, dialog, snack);
  }

  view(item: RegisterDelivery) {
    this.dialog.open(RegisterDeliveryViewDialogComponent, {
      data: item
    });
  }

}
