import { NgModule } from '@angular/core';
import { CarsRoutingModule } from './cars-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CarFiltersModule } from './car-filters/car-filters.module';

import { CarsComponent } from './cars.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarFiltersComponent } from './car-filters/car-filters.component';
import { CarComponent } from './car/car.component';

@NgModule({
    declarations: [
        CarListComponent,
        CarsComponent,
        CarFiltersComponent,
        CarComponent
    ],
    imports: [
        CarsRoutingModule,
        SharedModule.forRoot(),
        CarFiltersModule
    ],
})
export class CarsModule { }
