import { NgModule } from '@angular/core';
import { SliderModule } from 'primeng/slider';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [],
    imports: [
        SliderModule,
        SharedModule
    ],
    exports: [
        SliderModule
    ]
})
export class CarFiltersModule { }
