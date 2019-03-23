import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarService } from '../core/services/car.service';
import { Car } from '../core/models/car.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit, OnDestroy {
    selectedCars = [];

    private databaseCars: Car[];
    private carsChanges: Subscription;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carsChanges = this.carService.getCars().subscribe((result: Car[]) => {
            this.databaseCars = result;
        });
    }

    ngOnDestroy() {
        this.carsChanges.unsubscribe();
    }

    addToCompare(car: Car): void {
        if (this.selectedCars.indexOf(car) === -1) {
            this.selectedCars.push(car);
            this.selectedCars = Object.assign([], this.selectedCars);
        }
    }

    removeFromCompare(car: Car): void {
        const index = this.selectedCars.indexOf(car);
        this.selectedCars.splice(index, 1);
    }
}
