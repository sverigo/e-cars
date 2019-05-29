import { NgModule } from '@angular/core';

import { SliderModule } from 'primeng/slider';

import { CarsRoutingModule } from './cars-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CarComponent } from './car/car.component';
import { CarsComponent } from './cars.component';
import { CarFiltersComponent } from './car-filters/car-filters.component';
import { CarListComponent } from './car-list/car-list.component';

@NgModule({
    declarations: [
        CarComponent,
        CarsComponent,
        CarFiltersComponent,
        CarListComponent
    ],
    imports: [
        CarsRoutingModule,
        SliderModule,
        SharedModule.forRoot(),
    ]
})
export class CarsModule { }
