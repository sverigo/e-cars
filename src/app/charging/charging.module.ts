import { NgModule } from '@angular/core';

import { ChargingRoutingModule } from './charging-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ChargingComponent } from './charging.component';

@NgModule({
    declarations: [
        ChargingComponent
    ],
    imports: [
        ChargingRoutingModule,
        SharedModule.forRoot()
    ]
})
export class ChargingModule { }
