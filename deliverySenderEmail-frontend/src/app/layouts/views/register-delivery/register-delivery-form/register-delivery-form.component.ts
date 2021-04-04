import { ClientService } from './../../../../services/client.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Client } from './../../../../model/client.model';
import { RegisterDeliveryCreate } from './../../../../model/register-delivery-create.model';
import { RegisterDelivery } from './../../../../model/register-delivery.model';
import { RegisterDeliveryService } from './../../../../services/register-delivery.service';
import { TOAST } from './../../../constant/constant-messages';
import { ViewFileDialogComponent } from './../view-file/view-file.component';


@Component({
  selector: 'app-register-delivery-form',
  templateUrl: './register-delivery-form.component.html',
  styleUrls: ['./register-delivery-form.component.css']
})
export class RegisterDeliveryFormComponent {

  public obj: RegisterDeliveryCreate = new RegisterDeliveryCreate();
  public itemCreated: RegisterDelivery;

  public passFormToObj = false;

  private clientList: Client[] = [];
  public clientFilter: Client[] = [];

  public files: File[] = [];

  public form: FormGroup;
  public isSaving = false;

  constructor(
    public service: RegisterDeliveryService,
    public clientService: ClientService,
    public router: Router,
    public dialog: MatDialog,
    public snack?: MatSnackBar
  ) {
    this.form = new FormGroup({
      observation: new FormControl(null, []),
      client: new FormControl(null, [Validators.required]),
    });
    this.clientService.getAll().subscribe(
      success => {
        this.clientList = this.clientFilter = success;
      }
    );
  }

  get observation() {
    return this.form.get('observation');
  }

  get client() {
    return this.form.get('client');
  }

  beforeSave() {
  }

  afterLoad() {
  }

  searchClient(value: string) {
    if (value) {
      this.clientFilter = this.filterSeach(value, this.clientList, 'name');
    } else {
      this.clientFilter = this.clientList;
    }
  }

  public filterSeach(value: string, listFilter: any[], attributeName: string): any[] {
    const filterValue = value.toLowerCase();
    return listFilter.filter(item => item[attributeName].toLowerCase().indexOf(filterValue) !== -1);
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      if (this.files.length < 3) {
        const f: File = event.target.files[0];
        if (f.size <= 1500000) {
          this.files.push(f);
        } else {
          this.toastMessage('File need to be less then 1.5 MB');
        }
      } else {
        this.toastMessage('Limit of files reached');
      }
    }
  }

  private toastMessage(message: string) {
    this.snack.open(message, 'close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'error-snackbar',
    });
  }

  openDialog(file: File): void {
    this.dialog.open(ViewFileDialogComponent, {
      data: file
    });
  }

  async saveOrUpdate() {
    this.obj.client = this.client.value;
    this.obj.observation = this.observation.value;
    this.obj.numberOfAttachments = this.files.length;
    this.service.save(this.obj).subscribe(
      (success: {item: RegisterDelivery, urls: string[]}) => {
        this.itemCreated = success.item;
        this.uploadImages(success.urls);
      }, error => {
        this.toast(TOAST.ERROR.message, TOAST.ERROR.action, TOAST.ERROR.type);
      }
    );
  }

  uploadImages(urls: string[]) {
    forkJoin(urls.map((url, index, array) => this.service.uploadFile(url, this.files[index]))).subscribe(response => {
      this.service.sendEmail(this.itemCreated).subscribe(
        success => {
          this.toast('Email send successfully', TOAST.SUCCESS.SAVE.action, TOAST.SUCCESS.SAVE.type);
          this.back();
        }, error => {
          console.log('Error on send the email: ' + error);
        }
      );
    });
  }

  back() {
    const url = this.router.url.split('/');
    this.router.navigate([url[1]]);
  }

  toast(message: string, action: string, type: string) {
    this.snack.open(message, action, {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: type,
    });
  }

}
