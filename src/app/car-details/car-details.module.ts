import { NgModule } from '@angular/core';

import { GalleriaModule } from 'primeng/galleria';

import { CarDetailsRoutingModule } from './car-details-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CarDetailsComponent } from '../car-details/car-details.component';
import { CarRateComponent } from '../car-details/car-rate/car-rate.component';

@NgModule({
    declarations: [
        CarDetailsComponent,
        CarRateComponent
    ],
    imports: [
        CarDetailsRoutingModule,
        GalleriaModule,
        SharedModule.forRoot()
    ]
})
export class CarDetailsModule { }
