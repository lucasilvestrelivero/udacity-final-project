import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-view-file-dialog',
  templateUrl: 'view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileDialogComponent {

  imageBase64: any;

  constructor(
    public dialogRef: MatDialogRef<ViewFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: File) {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = () => {
        this.imageBase64 = reader.result;
      };

    }

}
