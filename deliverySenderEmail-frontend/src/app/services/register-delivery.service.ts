import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../layouts/abstract/abstract-service/crud-service/crud.service';
import { RegisterDelivery } from './../model/register-delivery.model';


@Injectable({
  providedIn: 'root'
})
export class RegisterDeliveryService extends CrudService<RegisterDelivery> {

  constructor(http: HttpClient) {
    super(http, 'delivery');
  }

  uploadFile(url: string, file: File) {
    const headers = new HttpHeaders({'Content-Type': file.type});
    return this.http.put(url, file, { headers });
  }

  sendEmail(item: RegisterDelivery) {
    const url = this.ENDPOINT_URL + '/' + 'email';
    return this.http.post(url, item);
  }

}
