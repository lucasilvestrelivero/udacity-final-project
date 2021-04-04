import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { DIALOG, TOAST } from '../../constant/constant-messages';
import { CrudService } from '../abstract-service/crud-service/crud.service';
import { DialogComponent } from '../dialog/dialog.component';
import { SpinnerComponent } from '../spinner/spinner.component';

export abstract class AbstractFormComponent<TModel extends any, TService extends CrudService<TModel>> implements OnInit {

    public obj: TModel;
    public edit: boolean;
    public loading: any;
    public form: FormGroup;
    public durationInSeconds = 5;
    public isSaving = false;
    public objId: string;

    public passFormToObj = true;

    constructor(
        public service: TService,
        public modelType: new () => TModel,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public dialog?: MatDialog,
        public snack?: MatSnackBar
    ) { }

    ngOnInit() {
        this.obj = this.getNew();
        this.getOne();
    }

    getNew(): TModel {
        return new this.modelType();
    }

    getOne() {
        if (this.activatedRoute.snapshot.paramMap.get('id') !== null) {
            this.loading = this.spinner();
            this.objId = this.activatedRoute.snapshot.paramMap.get('id');
            this.edit = true;
            this.service.getOne(this.objId).subscribe(
                success => {
                    setTimeout(() => {
                        this.loading.close();
                    }, 500);
                    this.obj = success;
                    if (this.passFormToObj) {
                      Object.keys(this.form.controls).forEach(key => {
                        this.form.get(key).setValue(this.obj[key]);
                      });
                    }
                    this.afterLoad();

                }, error => {
                  this.toast(TOAST.ERROR.message, TOAST.ERROR.action, TOAST.ERROR.type);
                  this.loading.close();
                }
            );
        }
    }

    beforeSave() {
    }

    saveOrUpdate() {
      this.isSaving = true;
      this.beforeSave();
      if (this.passFormToObj) {
        Object.keys(this.form.controls).forEach(key => {
            this.obj[key] = this.form.get(key).value;
        });
      }
      if (this.edit) {
          const dialogRef = this.dialog.open(DialogComponent, {
              width: '400px',
              data: { settings: DIALOG.CONFIRM.UPDATE }
          });

          dialogRef.afterClosed().subscribe(result => {
              if (result) {
                  this.service.patch(this.obj, this.objId).subscribe(
                      success => {
                          this.back();
                          this.toast(TOAST.SUCCESS.SAVE.message, TOAST.SUCCESS.SAVE.action, TOAST.SUCCESS.SAVE.type);
                      }, error => {
                          this.toast(TOAST.ERROR.message, TOAST.ERROR.action, TOAST.ERROR.type);
                      }
                  );
              }
          });

      } else {
          this.service.save(this.obj).subscribe(
              success => {
                  this.back();
                  this.toast(TOAST.SUCCESS.UPDATE.message, TOAST.SUCCESS.UPDATE.action, TOAST.SUCCESS.UPDATE.type);
              }, error => {
                  this.toast(TOAST.ERROR.message, TOAST.ERROR.action, TOAST.ERROR.type);
              }
          );
      }
    }

    afterLoad() { }

    getLocation() {
        const tree = this.router.parseUrl(this.router.url);
        return tree.root.children.primary.segments.map(it => it.path).join('/');
    }

    getParentPath(path?: any) {
        if (path) {
            return path.slice(0, Math.max(path.lastIndexOf('/'), 0));
        }
        return this.getLocation().slice(0, Math.max(this.getLocation().lastIndexOf('/'), 1)
        );
    }

    back() {
        if (this.edit) {
            this.router.navigate([this.getParentPath(this.getParentPath())]);
        } else {
            this.router.navigate([this.getParentPath()]);
        }
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
            hasBackdrop: false,
            panelClass: 'panel',
        });
    }
}
