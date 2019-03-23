import { Component, OnChanges, Input } from '@angular/core';

import { Equipment } from '../../core/models/equipment.model';

@Component({
    selector: 'app-car-equipment-properties',
    templateUrl: './car-equipment-properties.component.html',
    styleUrls: ['./car-equipment-properties.component.scss']
})
export class CarEquipmentPropertiesComponent implements OnChanges {
    @Input() equipments: Equipment[];
    @Input() carsInfo: { name: string, image: string }[];

    private carNames: string[];
    indices: string[];
    displayedColumns: string[] = ['title'];
    displayedPriceColumns: string[] = ['price'];
    private displayedImageColumns: string[] = ['image'];
    dataSource: { name: string, title: string }[] = [
        { name: 'acceleration', title: 'Разгон 0 — 100' },
        { name: 'battery', title: 'Ёмкость батареи' },
        { name: 'gear', title: 'Привод' },
        { name: 'power', title: 'Мощность' },
        { name: 'range', title: 'Запас хода' },
        { name: 'seating', title: 'Количество мест' },
        { name: 'speed', title: 'Максимальная скорость' },
        { name: 'weight', title: 'Масса' },
    ];

    ngOnChanges() {
        this.indices = this.equipments.map((e, i) => String(i));
        this.displayedColumns = ['title', ...this.indices];
        this.displayedPriceColumns = ['price', ...this.indices.map(e => `${e}-price`)];
        if (this.carsInfo) {
            this.displayedImageColumns = ['image', ...this.indices.map(e => `${e}-image`)];
        }
        this.carNames = this.carsInfo ? this.carsInfo.map( (e) => e.name ) : this.equipments.map( (e) => e.name );
    }
}
