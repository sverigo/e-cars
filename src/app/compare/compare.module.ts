import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CompareRoutingModule } from './compare-routing.module';

import { CompareComponent } from './compare.component';
import { AddFormComponent } from './add-form/add-form.component';
import { ComparisonTableComponent } from './comparison-table/comparison-table.component';

@NgModule({
    declarations: [
        CompareComponent,
        AddFormComponent,
        ComparisonTableComponent,
    ],
    imports: [
        CompareRoutingModule,
        SharedModule.forRoot()
    ]
})
export class CompareModule { }
