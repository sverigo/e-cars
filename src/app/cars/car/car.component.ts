import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Car } from '../../core/models/car.model';
import { Equipment } from 'src/app/core/models/equipment.model';
import { EquipmentService } from '../../core/services/equipment.service';

@Component({
    selector: 'app-car',
    templateUrl: './car.component.html',
    styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnChanges {

    @Input() car: Car;

    name: string;
    prevImage: string;
    rating: number;
    priceRange: { min: number, max: number };
    horsePower: { min: number, max: number };
    batteryCapacity: { min: number, max: number };
    range: { min: number, max: number };

    private currentCar: Car;
    private equipments: Equipment[];

    constructor(private eqService: EquipmentService) {}

    ngOnChanges(changes: SimpleChanges) {
        const car: SimpleChange = changes.car;
        this.currentCar = car.currentValue;
        this.equipments = this.currentCar.equipments;
        this.updateCarProperties();
    }

    updateCarProperties(): void {
        this.priceRange = {
            min: this.eqService.getMinEquipmentsValue(this.equipments, 'price'),
            max: this.eqService.getMaxEquipmentsValue(this.equipments, 'price')
        };
        this.horsePower = {
            min: this.eqService.getMinEquipmentsValue(this.equipments, 'power'),
            max: this.eqService.getMaxEquipmentsValue(this.equipments, 'power')
        };
        this.range = {
            min: this.eqService.getMinEquipmentsValue(this.equipments, 'range'),
            max: this.eqService.getMaxEquipmentsValue(this.equipments, 'range')
        };
        this.batteryCapacity = {
            min: this.eqService.getMinEquipmentsValue(this.equipments, 'battery'),
            max: this.eqService.getMaxEquipmentsValue(this.equipments, 'battery')
        };
        this.name = this.currentCar.make + ' ' + this.currentCar.model;
        this.prevImage = this.currentCar.imageLinks[0];
        this.rating = this.currentCar.rating;
    }
}
