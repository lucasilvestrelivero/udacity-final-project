import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [DialogComponent, SpinnerComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    TranslateModule
  ],
  entryComponents: [DialogComponent, SpinnerComponent]
})
export class AbstractModule { }
