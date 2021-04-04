import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { DIALOG, TOAST } from '../../constant/constant-messages';
import { CrudService } from '../abstract-service/crud-service/crud.service';
import { DialogComponent } from '../dialog/dialog.component';

export abstract class AbstractListComponent<TModel extends any, TService extends CrudService<TModel>> implements OnInit, AfterViewInit {

    @ViewChild('table', { static: false }) table: any;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    public durationInSeconds = 5;
    public loading: boolean;
    public list: TModel[] = [];
    public viewDelete: boolean = false;

    public dataSource = new MatTableDataSource<TModel>();
    public displayedColumns: TModel[] = [];
    public selection = new SelectionModel<TModel>(true, []);

    constructor(
        public service: TService,
        public router: Router,
        public dialog?: MatDialog,
        public snack?: MatSnackBar
    ) { }

    ngOnInit() {
        this.getAll();

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.updateTable();
        }, 0);
    }

    getAll() {
        this.loading = true;
        this.service.getAll().subscribe(
            success => {
                setTimeout(() => {
                    this.loading = false;
                }, 500);
                this.list = success;
                this.dataSource = new MatTableDataSource(this.list);
                this.updateTable();
            }, error => {
                this.toast('error', TOAST.ERROR.action, TOAST.ERROR.type);
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            }
        );
    }

    updateTable() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.displayedColumns = this.table._contentColumnDefs._results.map((o: { _name: string; }) => o._name);
    }

    getLocation() {
        const tree = this.router.parseUrl(this.router.url);
        return tree.root.children.primary.segments.map(it => it.path).join('/');
    }

    create() {
        this.router.navigate([this.getLocation() + '/form']);
    }

    edit(id: string) {
        this.router.navigate([this.getLocation() + '/form', id]);
    }

    delete(id: string) {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: { settings: DIALOG.CONFIRM.DELETE }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.service.delete(id).subscribe(
                  success => {
                      this.getAll();
                      this.toast(TOAST.SUCCESS.DELETE.message, TOAST.SUCCESS.DELETE.action, TOAST.SUCCESS.DELETE.type);
                  }, error => {
                      this.toast('error', TOAST.ERROR.action, TOAST.ERROR.type);
                  }
              );
            } else {
              this.getAll();
            }
        });
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
