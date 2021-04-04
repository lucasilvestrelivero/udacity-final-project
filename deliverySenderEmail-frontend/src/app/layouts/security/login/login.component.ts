import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../auth-service/authentication.service';
import { TOAST } from '../../constant/constant-messages';
import { SpinnerComponent } from '../../abstract/spinner/spinner.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  username: string;
  password: string;

  public loading: any;
  public durationInSeconds = 5;
  error: any;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public snack: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.user) {
      this.router.navigate(['/']);
    }
    this.translate.setDefaultLang('pt');
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submitCredentials() {
    this.loading = this.spinner();
    this.authenticationService.login(this.username, this.password).pipe(first()).subscribe(
      success => {
        this.router.navigate([this.returnUrl]);
        setTimeout(() => {
          this.loading.close();
        }, 500);
        this.toast(TOAST.SUCCESS.WELCOME.message, TOAST.SUCCESS.WELCOME.action, TOAST.SUCCESS.WELCOME.type);

      }, error => {
        setTimeout(() => {
          this.loading.close();
        }, 500);


        this.toast(TOAST.ERROR_LOGIN.message, TOAST.ERROR_LOGIN.action, TOAST.ERROR_LOGIN.type);
      })
  }

  toast(message: string, action: string, type: string) {
    this.snack.open(message, action, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: type,
    });
  }

  spinner() {
    return this.dialog.open(SpinnerComponent, {
      width: '100%',
      height: '100%',
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'panel',
    });
  }

}
