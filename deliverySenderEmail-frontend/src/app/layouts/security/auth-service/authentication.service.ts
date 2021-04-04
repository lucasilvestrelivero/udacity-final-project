import { User } from './../../../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudService } from '../../abstract/abstract-service/crud-service/crud.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const url = CrudService.BASE_URL + 'auth/login';
    return this.http
      .post<any>(url, { username, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user.user));
        localStorage.setItem('token', user.auth);
        return user;
      }
    ));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  get userToken(): string {
    return localStorage.getItem('token') || null;
  }

  get user(): User {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
  }
}
