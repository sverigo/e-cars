import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { GalleriaModule } from 'primeng/galleria';

import { CarDetailsComponent } from '../car-details/car-details.component';
import { CarRateComponent } from '../car-details/car-rate/car-rate.component';
import { CarDetailsRoutingModule } from './car-details-routing.module';

@NgModule({
    declarations: [
        CarDetailsComponent,
        CarRateComponent
    ],
    imports: [
        CarDetailsRoutingModule,
        SharedModule.forRoot(),
        GalleriaModule
    ],
})
export class CarDetailsModule { }
