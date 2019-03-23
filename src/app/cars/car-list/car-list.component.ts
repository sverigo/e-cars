import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Car } from '../../core/models/car.model';

@Component({
    selector: 'app-car-list',
    templateUrl: './car-list.component.html',
    styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnChanges {

    @Input() cars: Car[];

    carList: Car[];

    ngOnChanges(changes: SimpleChanges) {
        const cars: SimpleChange = changes.cars;
        this.carList = cars.currentValue;
    }
}
