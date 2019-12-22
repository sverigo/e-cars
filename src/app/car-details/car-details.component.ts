import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CarService } from '../core/services/car.service';
import { Car } from '../core/models/car.model';
import { EquipmentService } from '../core/services/equipment.service';
import { Equipment } from '../core/models/equipment.model';

@Component({
    selector: 'app-car-details',
    templateUrl: './car-details.component.html',
    styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnDestroy {
    car: Car;
    private carName: string;
    private carPriceRange: string;
    private carBatteryRange: string;
    private carPowerRange: string;
    private carRangeRange: string;
    private carImages: any[];
    private equipments: Equipment[];
    private selectedEquipment;
    private subscription;

    constructor(
        router: Router,
        activatedRoute: ActivatedRoute,
        carService: CarService,
        private equipmentService: EquipmentService
    ) {
        const id = parseInt(activatedRoute.snapshot.params.id.match(/\d+/)[0]);
        this.subscription = carService.getCarById(id).subscribe(
            (car) => {
                if (car) this.setCar(car);
                else router.navigateByUrl('cars');
            }
        );
    }

    setCar(car) {
        this.car = car;
        this.carName = `${car.make} ${car.model}`;
        this.equipments = car.equipments;

        this.carImages = car.imageLinks.map(
            (e) => ({
                source: e,
                title: '',
            })
        );

        let priceMin = this.equipmentService.getMinEquipmentsValue(car.equipments, 'price');
        let priceMax = this.equipmentService.getMaxEquipmentsValue(car.equipments, 'price');

        this.carPriceRange = priceMin === priceMax ?
                `${priceMin} $` : `${priceMin} — ${priceMax} $`;

        let batteryMin = this.equipmentService.getMinEquipmentsValue(car.equipments, 'battery');
        let batteryMax = this.equipmentService.getMaxEquipmentsValue(car.equipments, 'battery');

        this.carBatteryRange = batteryMin === batteryMax ?
                `${batteryMin} А*ч` : `${batteryMin} — ${batteryMax} А*ч`;

        let powerMin = this.equipmentService.getMinEquipmentsValue(car.equipments, 'power');
        let powerMax = this.equipmentService.getMaxEquipmentsValue(car.equipments, 'power');

        this.carPowerRange = powerMin === powerMax ?
                `${powerMin} л.с.` : `${powerMin} — ${powerMax} л.с.`;

        let rangeMin = this.equipmentService.getMinEquipmentsValue(car.equipments, 'range');
        let rangeMax = this.equipmentService.getMaxEquipmentsValue(car.equipments, 'range');

        this.carRangeRange = rangeMin === rangeMax ?
                `${rangeMin} км` : `${rangeMin} — ${rangeMax} км`;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
