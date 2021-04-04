import { RegisterDelivery } from './../../../../model/register-delivery.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-register-delivery-view-dialog',
  templateUrl: 'register-delivery-view.component.html',
  styleUrls: ['./register-delivery-view.component.css']
})
export class RegisterDeliveryViewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RegisterDeliveryViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterDelivery) {
    }

}
