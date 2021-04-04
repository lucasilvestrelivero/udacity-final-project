import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AbstractListComponent } from 'src/app/layouts/abstract/abstract-component/abstract-list';

import { Client } from './../../../../model/client.model';
import { ClientService } from './../../../../services/client.service';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent extends AbstractListComponent<Client, ClientService> {

  constructor(
    service: ClientService,
    router: Router,
    dialog: MatDialog,
    snack: MatSnackBar
  ) {
    super(service, router, dialog, snack);
  }

}
