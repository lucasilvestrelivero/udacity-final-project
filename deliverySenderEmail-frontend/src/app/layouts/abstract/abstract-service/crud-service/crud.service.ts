import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T> {

  public static BASE_URL = 'https://ag1oe9hmtc.execute-api.sa-east-1.amazonaws.com/dev/';
  protected ENDPOINT_URL: string;

  constructor(
    public http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public URL: string
  ) {
    this.ENDPOINT_URL = CrudService.BASE_URL + URL;
  }

  public getAll(): Observable<any> {
    const url = this.ENDPOINT_URL;
    return this.http.get(url);
  }

  public getOne(id: string): Observable<any> {
    const url = this.ENDPOINT_URL + '/' + id;
    return this.http.get(url);
  }

  public save(data: T | any): Observable<any> {
    const url = this.ENDPOINT_URL;
    return this.http.post(url, data);
  }

  public update(data: T): Observable<any> {
    const url = this.ENDPOINT_URL;
    return this.http.put(url, data);
  }

  public patch(data: T, objId: string): Observable<any> {
    const url = this.ENDPOINT_URL + '/' + objId;
    return this.http.patch(url, data);
  }

  public delete(id: string): Observable<any> {
    const url = this.ENDPOINT_URL + '/' + id;
    return this.http.delete(url);
  }

  public enable(id: string): Observable<any> {
    const url = this.ENDPOINT_URL + 'enabled';
    return this.http.put(url, id);
  }

  public deleteList(data: T | any): Observable<any> {
    const url = this.ENDPOINT_URL + 'list/';
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: data
    };
    return this.http.delete(url, options);
  }
}
