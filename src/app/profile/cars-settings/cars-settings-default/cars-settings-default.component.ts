import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { CarService } from 'src/app/core/services/car.service';
import { Car } from 'src/app/core/models/car.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-cars-settings-default',
    templateUrl: './cars-settings-default.component.html',
    styleUrls: ['./cars-settings-default.component.scss']
})
export class CarsSettingsDefaultComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['id', 'make', 'model', 'details', 'update', 'delete'];
    dataSource = new MatTableDataSource<Car>();

    private carsChanges: Subscription;

    constructor(private carService: CarService, private router: Router, public dialog: MatDialog) { }

    ngOnInit() {
        this.carsChanges = this.carService.getCars().subscribe((data: Car[]) => {
            this.dataSource.data = data;
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    ngOnDestroy() {
        this.carsChanges.unsubscribe();
    }

    createCar(): void {
        this.router.navigateByUrl('/profile/cars/create');
    }

    editCar(id: number): void {
        this.router.navigate(['/profile/cars/edit', id]);
    }

    deleteCar(id: number): void {
        this.carService.deleteCar(id);
    }

    redirectToCarDetails(id: number): void {
        this.router.navigate(['/car', id]);
    }

    filter(value: string): void {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    openDialog(car: Car): void {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                header: 'Удаление',
                content: 'Вы действительно хотите удалить ' + car.make + ' ' + car.model + '?',
                methodName: 'deleteCar',
                service: this.carService,
                id: car.id
            }
        });
    }
}
