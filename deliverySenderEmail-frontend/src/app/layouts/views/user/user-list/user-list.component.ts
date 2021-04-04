import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from './../../../../services/user.service';
import { User } from './../../../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { AbstractListComponent } from 'src/app/layouts/abstract/abstract-component/abstract-list';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends AbstractListComponent<User, UserService> {

  isActive = false;

  listRouterPlanned: any;

  constructor(
    service: UserService,
    router: Router,
    dialog: MatDialog,
    snack: MatSnackBar
  ) {
    super(service, router, dialog, snack);
  }

}
