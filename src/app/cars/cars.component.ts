import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Car } from '../core/models/car.model';
import { CarService } from '../core/services/car.service';
import { FilterValues } from './car-filters/filter.model';

@Component({
    selector: 'app-cars',
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit, OnDestroy {
    fullCarList: Car[];
    displayedCars: Car[];
    currentPage: number;
    totalCount: number;
    itemsPerPage = 6;
    
    private filteredCars: Car[] = [];
    private pageCount: number;
    private pageStep: number;
    private carsChanges: Subscription;
    private routeChanges: Subscription;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private carService: CarService) { }

    ngOnInit(): void {
        this.carsChanges = this.carService.getCars().subscribe((result: Car[]) => {
            this.fullCarList = Object.assign([], result);
            this.filteredCars = Object.assign([], result);
            this.onChangeRoute();
        });

        this.routeChanges = this.activatedRoute.queryParams.subscribe((params) => {
            if (!params.page) {
                this.currentPage = 1;
            } else {
                this.currentPage = +params.page;
            }
            this.pageStep = this.currentPage;
            this.onChangeRoute();
        });
        console.log(this.currentPage);
    }

    ngOnDestroy(): void {
        this.carsChanges.unsubscribe();
        this.routeChanges.unsubscribe();
    }

    loadMore(): void {
        this.pageStep++;
        this.displayedCars = this.displayedCars.concat(this.filteredCars.slice((this.pageStep - 1) * this.itemsPerPage,
            this.itemsPerPage * this.pageStep));
    }

    loadPage(n: number): void {
        this.router.navigate(['/cars'], { queryParams: { page: n } });
    }

    onChangeRoute(): void {
        if (!this.currentPage) {
            if (this.activatedRoute.snapshot.queryParams.page) {
                this.currentPage = +this.activatedRoute.snapshot.queryParams.page;
            } else {
                this.currentPage = 1;
            }
        }
        this.totalCount = this.filteredCars.length;
        this.pageCount = Math.ceil(this.totalCount / this.itemsPerPage);
        if (this.filteredCars.length) {
            if (this.currentPage > 0 && this.currentPage <= this.pageCount && Number.isInteger(this.currentPage)) {
                this.displayedCars = this.filteredCars.slice((this.currentPage - 1) * this.itemsPerPage, this.itemsPerPage * this.currentPage);
            } else {       
                console.log('test');    
                this.router.navigate(['/cars'], { queryParams: { page: this.currentPage } });
            }
        }
    }

    filterCarList(filterValues: FilterValues): void {
        this.filteredCars = this.carService.filterCars(filterValues, this.fullCarList);

        if (this.filteredCars.length) {
            this.onChangeRoute();
        } else {
            this.displayedCars = [];
            this.totalCount = 0;
        }
    }

    cancelFilters(): void {
        this.filteredCars = this.fullCarList;
        this.onChangeRoute();
    }
}
