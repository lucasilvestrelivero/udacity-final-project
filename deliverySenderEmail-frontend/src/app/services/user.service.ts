import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../layouts/abstract/abstract-service/crud-service/crud.service';

import { User } from './../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {

  constructor(http: HttpClient) {
    super(http, 'user');
  }
}
