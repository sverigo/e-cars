import { Component, Input, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Car } from '../../core/models/car.model';
import { Equipment } from '../../core/models/equipment.model';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'app-comparison-table',
    templateUrl: './comparison-table.component.html',
    styleUrls: ['./comparison-table.component.scss']
})
export class ComparisonTableComponent implements OnChanges {

    @Input() cars: Car[];
    @Output() removeFromCompare = new EventEmitter<Car>();

    selectedEquipments: Equipment[] = [];
    selectedCars: { name: string, image: string }[] = [];

    ngOnChanges(changes: SimpleChanges) {
        const cars: SimpleChange = changes.cars;
        this.cars = cars.currentValue;
    }

    removeCar(car: Car): void {
        car.equipments.forEach(equipment => {
            const index = this.selectedEquipments.indexOf(equipment);
            if (index !== -1) {
                this.selectedEquipments.splice(index, 1);
                this.selectedEquipments = Object.assign([], this.selectedEquipments);
                this.selectedCars.splice(index, 1);
                this.selectedCars = Object.assign([], this.selectedCars);
            }
        });

        this.removeFromCompare.emit(car);
    }

    onCheckboxChange(event: MatCheckbox, equipment: Equipment, car: Car): void {
        if (event.checked) {
            this.selectedCars.push({ name: car.make + ' ' + car.model, image: car.imageLinks[0] });
            this.selectedEquipments.push(equipment);
            this.selectedEquipments = Object.assign([], this.selectedEquipments);
        } else {
            const index = this.selectedEquipments.indexOf(equipment);
            if (index !== -1) {
                this.selectedEquipments.splice(index, 1);
                this.selectedEquipments = Object.assign([], this.selectedEquipments);
                this.selectedCars.splice(index, 1);
                this.selectedCars = Object.assign([], this.selectedCars);
            }
        }
    }
}
