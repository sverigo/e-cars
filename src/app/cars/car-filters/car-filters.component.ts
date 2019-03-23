import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, Output } from '@angular/core';
import { Car } from '../../core/models/car.model';
import { RangeValues } from './range.model';
import { FilterValues } from './filter.model';
import { EventEmitter } from '@angular/core';
import { EquipmentService } from '../../core/services/equipment.service';

@Component({
  selector: 'app-car-filters',
  templateUrl: './car-filters.component.html',
  styleUrls: ['./car-filters.component.scss']
})
export class CarFiltersComponent implements OnInit, OnChanges {

    @Input() cars: Car[];
    @Output() filterCarList = new EventEmitter();
    @Output() cancelFilters = new EventEmitter();

    private carList: Car[];
    carModels: Car[];
    makeSelected: number;
    modelSelected: string;
    filterValues: FilterValues;
    uniqCarsMake: Car[];

    price = new RangeValues();
    battery = new RangeValues();
    power = new RangeValues();
    range = new RangeValues();
    private rangesArr = [
        'price',
        'battery',
        'power',
        'range'
    ];

    constructor( private eqService: EquipmentService ) { }

    ngOnInit() {
    }

    ngOnChanges( changes: SimpleChanges ) {
        const cars: SimpleChange = changes.cars;
        this.carList = cars.currentValue;
        this.uniqCarsMake = this.getUniqMakes( this.carList );
        if ( this.carList ) {
            this.getValuesForRanges(this.carList);
        }
    }

    getUniqMakes( cars: Car[] ): Car[] {
        const uniqCars = [];

        next:
        for ( let i = 0; i < cars.length; i++ ) {
            const uniqCar = cars[i];
            for ( let j = 0; j < uniqCars.length; j++ ) {
                if ( uniqCars[j].make === uniqCar.make ) continue next;
            }
            uniqCars.push( uniqCar );
        }

        return uniqCars;
    }

    onMekeSelect() {
        this.carModels = this.carList.filter( ( car ) => car.make === this.carList[this.makeSelected - 1].make );
    }

    getValuesForRanges( carList: Car[] ) {
        let equipments = [];

        carList.forEach( ( car ) => {
            equipments = equipments.concat(car.equipments);
        });

        this.rangesArr.forEach( ( rangeName ) => {
            this[rangeName].min = this.eqService.getMinEquipmentsValue(equipments, rangeName);
            this[rangeName].max = this.eqService.getMaxEquipmentsValue(equipments, rangeName);
            this[rangeName].values = [ this[rangeName].min, this[rangeName].max ];
        });

        this.price.min = Number( this.price.min ) / 1000;
        this.price.max = Number( this.price.max ) / 1000;
        this.price.values = [ this.price.min, this.price.max ];
    }

    filterCars() {
        this.filterValues = new FilterValues (
            this.makeSelected,
            this.modelSelected,
            [ this.price.values[0] * 1000, this.price.values[1] * 1000 ],
            this.battery.values,
            this.power.values,
            this.range.values
        );

        this.filterCarList.emit( this.filterValues );
    }

    clearFilters() {
        this.cancelFilters.emit();
        this.filterValues = null;
        this.makeSelected = null;
        this.modelSelected = null;
        this.getValuesForRanges( this.carList );
    }
}
