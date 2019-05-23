import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { CarsSettingsComponent } from './cars-settings.component';
import { CarsSettingsDefaultComponent } from './cars-settings-default/cars-settings-default.component';
import { CarsFormComponent } from './cars-form/cars-form.component';

const routes: Routes = [
    { path: '', component: CarsSettingsComponent, children: [
        { path: '', component: CarsSettingsDefaultComponent },
        { path: 'add', component: CarsFormComponent },
        { path: 'edit/:id', component: CarsFormComponent }
    ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CarsSettingsRoutingModule { }