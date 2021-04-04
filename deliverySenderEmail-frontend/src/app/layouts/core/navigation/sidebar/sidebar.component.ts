import { User } from './../../../../model/user.model';
import { AuthenticationService } from './../../../security/auth-service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface RouterInfo {
  path?: string;
  icon?: string;
  title?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  router: RouterInfo[] = [
    {
      path: '',
      icon: 'home_work',
      title: 'Dashboard',
    },
    {
      path: '/delivery',
      icon: 'email',
      title: 'Delivery Confirmation',
    },
    {
      path: '/user',
      icon: 'supervised_user_circle',
      title: 'User',
    },
    {
      path: '/client',
      icon: 'business_center',
      title: 'Client',
    },
  ];

  public user: string;

  constructor(
    private route: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    const parse: User = JSON.parse(localStorage.getItem('currentUser'));
    this.user = parse.username.split(' ')[0] || parse.username;
  }

}
