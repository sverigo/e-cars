import { NgModule } from '@angular/core';

import { CarsSettingsRoutingModule } from './cars-settings-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { CarsFormComponent } from './cars-form/cars-form.component';
import { CarsSettingsComponent } from './cars-settings.component';
import { CarsSettingsDefaultComponent } from './cars-settings-default/cars-settings-default.component';

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