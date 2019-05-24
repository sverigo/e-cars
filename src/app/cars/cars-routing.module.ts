import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarsComponent } from './cars.component';

const routes: Routes = [
    { path: '', redirectTo: 'cars/1', pathMatch: 'full' },
    { path: ':id', component: CarsComponent },
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
export class CarsRoutingModule { }
