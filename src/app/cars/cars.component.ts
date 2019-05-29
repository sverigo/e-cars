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

        this.routeChanges = this.activatedRoute.params.subscribe((params) => {
            this.currentPage = +params.id;
            this.pageStep = this.currentPage;
            this.onChangeRoute();
        });
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
        this.router.navigate(['/cars', n]);
    }

    onChangeRoute(): void {
        this.totalCount = this.filteredCars.length;
        this.pageCount = Math.ceil(this.totalCount / this.itemsPerPage);
        if (this.filteredCars.length) {
            if (this.currentPage > 0 && this.currentPage <= this.pageCount && Number.isInteger(this.currentPage)) {
                this.displayedCars = this.filteredCars.slice((this.currentPage - 1) * this.itemsPerPage, this.itemsPerPage * this.currentPage);
            } else {
                this.router.navigateByUrl('/');
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
