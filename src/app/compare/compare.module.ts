import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CompareComponent } from './compare.component';
import { AddFormComponent } from './add-form/add-form.component';
import { ComparisonTableComponent } from './comparison-table/comparison-table.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CompareComponent,
        AddFormComponent,
        ComparisonTableComponent,
    ],
    imports: [
        AppRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class CompareModule { }
