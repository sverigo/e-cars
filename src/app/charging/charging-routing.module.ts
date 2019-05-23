import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChargingComponent } from './charging.component';

const routes: Routes = [
    { path: '', component: ChargingComponent },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ChargingRoutingModule { }
