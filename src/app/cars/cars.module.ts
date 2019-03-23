import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CarFiltersModule } from './car-filters/car-filters.module';

import { GalleriaModule } from 'primeng/galleria';

import { CarsComponent } from './cars.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarFiltersComponent } from './car-filters/car-filters.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarComponent } from './car/car.component';
import { CarRateComponent } from './car-rate/car-rate.component';

@NgModule({
    declarations: [
        CarListComponent,
        CarsComponent,
        CarFiltersComponent,
        CarDetailsComponent,
        CarComponent,
        CarRateComponent
    ],
    imports: [
        AppRoutingModule,
        SharedModule,
        CarFiltersModule,
        GalleriaModule
    ],
})
export class CarsModule { }
