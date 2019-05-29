import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompareComponent } from './compare.component';

const routes: Routes = [
    { path: '', component: CompareComponent }
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
export class CompareRoutingModule { }
