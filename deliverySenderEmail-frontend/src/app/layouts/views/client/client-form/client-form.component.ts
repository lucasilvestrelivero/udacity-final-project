import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractFormComponent } from 'src/app/layouts/abstract/abstract-component/abstract-form';

import { Client } from './../../../../model/client.model';
import { ClientService } from './../../../../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent extends AbstractFormComponent<Client, ClientService> implements OnInit {

  public obj: Client = new Client();

  public passFormToObj = false;

  @ViewChildren('inputArray') rows: QueryList<ElementRef>;

  constructor(
    service: ClientService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    snack: MatSnackBar
  ) {
    super(service, Client, router, activatedRoute, dialog, snack);
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      emails: new FormArray([this.createItem()])
    });
  }

  get name() {
    return this.form.get('name');
  }

  get emails(): FormArray {
    return this.form.get('emails') as FormArray;
  }

  public addItem(): void {
    if (!(this.emails.controls[this.emails.controls.length - 1] as FormGroup).controls.email.errors) {
      this.emails.push(this.createItem());
      setTimeout(() => {
        this.rows.last.nativeElement.focus();
      }, 100);
    }
  }

  private createItem(value?: string): FormGroup {
    return new FormGroup({
      email: new FormControl(value, [Validators.required])
    });
  }

  hasErrorArrayGroup(index: number): boolean {
    if (this.emails.controls.length > 1) {
      return ((this.emails.controls[index] as FormGroup).controls.email.invalid
        && ((this.emails.controls[index] as FormGroup).controls.email.dirty
          || (this.emails.controls[index] as FormGroup).controls.email.touched));
    } else {
      return false;
    }
  }

  hasErrorRequired(index: number): boolean {
    if (this.emails.controls.length > 1) {
    return ((this.emails.controls[index] as FormGroup).controls.description.hasError('required'));
    } else {
      return false;
    }
  }

  public removeItem(index: number): void {
    if (this.emails.controls.length > 1) {
      this.emails.removeAt(index);
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }

  beforeSave() {
    this.obj.name = this.name.value;
    this.obj.emails = this.emails.value.map(x => x.email);
  }

  afterLoad() {
    this.name.setValue(this.obj.name);

    this.obj.emails.forEach((value, index, array) => {
      if (index === 0) {
        (this.emails.controls[0] as FormGroup).controls.email.setValue(value);
      } else {
        this.emails.push(this.createItem(value));
      }
    });
  }

}
