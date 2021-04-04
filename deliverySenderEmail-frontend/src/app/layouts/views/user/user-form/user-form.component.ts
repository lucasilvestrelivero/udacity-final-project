import { OnInit, Component } from '@angular/core';
import { UserService } from './../../../../services/user.service';
import { User } from './../../../../model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractFormComponent } from 'src/app/layouts/abstract/abstract-component/abstract-form';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends AbstractFormComponent<User, UserService> implements OnInit {

  public obj: User = new User();

  public visibilityPass = false;
  public visibilityPassRepeat = false;

  public passFormToObj = false;

  constructor(
    service: UserService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    snack: MatSnackBar
  ) {
    super(service, User, router, activatedRoute, dialog, snack);
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  ngOnInit() {
    super.ngOnInit();
    this.password.valueChanges.subscribe(value => {
      this.MustMatch();
    });
    this.confirmPassword.valueChanges.subscribe(value => {
      this.MustMatch();
    });
  }

  MustMatch() {
    if (!this.password.value) {
      if (this.confirmPassword.errors) {
        this.confirmPassword.clearValidators();
        this.confirmPassword.updateValueAndValidity();
      }
      return;
    }
    if (this.confirmPassword.errors && !this.confirmPassword.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.setErrors({ mustMatch: true });
    } else {
      this.confirmPassword.setErrors(null);
    }
  }

  beforeSave() {
    this.obj.username = this.username.value;
    this.obj.password = this.password.value;
  }

  afterLoad() {
    this.username.setValue(this.obj.username);
    this.password.setValue(this.obj.password);
    this.confirmPassword.setValue(this.obj.password);
  }

  back() {
    if (this.router.url.indexOf('register') > -1) {
      this.router.navigate(['/login']);
    } else {
      super.back();
    }
  }


}
