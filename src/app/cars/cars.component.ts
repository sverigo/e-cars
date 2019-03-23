import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from '../core/services/car.service';
import { Car } from '../core/models/car.model';
import { FilterValues } from './car-filters/filter.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cars',
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit, OnDestroy {
    databaseCars: Car[];
    currentPage: number;
    itemsPerPage = 6;
    carsToDisplay: Car[];
    totalCount: number;

    private carList: Car[];
    private pageCount: number;
    private pageStep: number;
    private carsChanges: Subscription;
    private routeChanges: Subscription;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private carService: CarService) {
        this.currentPage = activatedRoute.snapshot.params.id;
        this.router = router;
    }

    ngOnInit() {
        this.carsChanges = this.carService.getCars().subscribe((result: Car[]) => {
            this.databaseCars = this.carList = result;
            this.totalCount = this.carList.length;
            this.onChangeData();
        });

        this.routeChanges = this.activatedRoute.params.subscribe(() => {
            this.onChangeData();
        });
    }

    ngOnDestroy() {
        this.carsChanges.unsubscribe();
        this.routeChanges.unsubscribe();
    }

    loadMore(): void {
        this.pageStep++;
        this.carsToDisplay = this.carsToDisplay.concat(this.carList.slice((this.pageStep - 1) * this.itemsPerPage,
            this.itemsPerPage * this.pageStep));
    }

    loadPage(n: number): void {
        this.router.navigate(['/cars', n]);
    }

    onChangeData(): void {
        if (this.carList !== undefined) {
            this.currentPage = +this.router.url.replace(/\D+/g, '');
            this.pageStep = this.currentPage;
            this.totalCount = this.carList.length;
            this.pageCount = Math.ceil(this.totalCount / this.itemsPerPage);

            if (this.currentPage > 0 && this.currentPage <= this.pageCount && Number.isInteger(+this.currentPage)) {
                this.carsToDisplay = this.carList.slice((this.currentPage - 1) * this.itemsPerPage, this.itemsPerPage * this.currentPage);
            } else {
                this.router.navigate(['/not-found']);
            }
        }
    }

    filterCarList(filterValues: FilterValues): void {
        this.carList = this.carService.filterCars(filterValues, this.databaseCars);

        if (this.carList.length) {
            this.onChangeData();
        } else {
            this.carsToDisplay = [];
            this.totalCount = 0;
        }
    }

    cancelFilters(): void {
        this.carList = this.databaseCars;
        this.onChangeData();
    }
}
