import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../auth-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  public durationInSeconds = 5;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public snack?: MatSnackBar
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.user;
    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.user;
    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return true;
  }

  toast(message: string, action: string, type: string) {
    this.snack.open(message, action, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: type,
    });
  }

}
