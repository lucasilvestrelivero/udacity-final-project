import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../layouts/abstract/abstract-service/crud-service/crud.service';
import { Client } from './../model/client.model';


@Injectable({
  providedIn: 'root'
})
export class ClientService extends CrudService<Client> {

  constructor(http: HttpClient) {
    super(http, 'client');
  }
}
