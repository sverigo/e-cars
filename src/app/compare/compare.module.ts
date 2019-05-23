import { NgModule } from '@angular/core';

import { CompareRoutingModule } from './compare-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AddFormComponent } from './add-form/add-form.component';
import { CompareComponent } from './compare.component';
import { ComparisonTableComponent } from './comparison-table/comparison-table.component';

@NgModule({
    declarations: [
        AddFormComponent,
        CompareComponent,
        ComparisonTableComponent
    ],
    imports: [
        CompareRoutingModule,
        SharedModule.forRoot()
    ]
})
export class CompareModule { }
