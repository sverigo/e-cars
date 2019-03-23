import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Car } from '../../core/models/car.model';
import { CarService } from '../../core/services/car.service';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit, OnDestroy {
    @Output() addToCompare = new EventEmitter<Car>();

    form: FormGroup;
    makes: string[];
    filteredCars: Car[];

    private cars: Car[];
    private carsChanges: Subscription;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carsChanges = this.carService.getCars().subscribe((result: Car[]) => {
            this.cars = result;
            this.makes = this.getUniqueMakes(this.cars);
        });

        this.form = new FormGroup({
            makes: new FormControl('', Validators.required),
            models: new FormControl('', Validators.required)
        });
    }

    ngOnDestroy() {
        this.carsChanges.unsubscribe();
    }

    onMakeSelected(make: string): void {
        this.filteredCars = this.cars.filter(car => car.make === make);
    }

    onCarSelected(): void {
        const make = this.form.value.makes;
        const model = this.form.value.models;
        const selectedCar = this.getSelectedCar(make, model);

        this.addToCompare.emit(selectedCar);
    }

    private getSelectedCar(make: string, model: string): Car {
        return this.cars.filter(car => car.make === make && car.model === model)[0];
    }

    private getUniqueMakes(cars: Car[]): string[] {
        const makes = new Set();
        cars.forEach((car: Car) => makes.add(car.make));
        return Array.from(makes);
    }
}
