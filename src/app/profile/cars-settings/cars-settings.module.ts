import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CarsSettingsRoutingModule } from './cars-settings-routing.module';

import { CarsSettingsComponent } from './cars-settings.component';
import { CarsSettingsDefaultComponent } from './cars-settings-default/cars-settings-default.component';
import { CarsFormComponent } from './cars-form/cars-form.component';

@NgModule({
    declarations: [
        CarsFormComponent,
        CarsSettingsComponent,
        CarsSettingsDefaultComponent,
    ],
    imports: [
        CarsSettingsRoutingModule,
        SharedModule.forRoot()
    ]
})
export class CarsSettingsModule { }