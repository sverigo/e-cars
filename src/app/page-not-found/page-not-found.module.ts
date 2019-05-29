import { NgModule } from '@angular/core';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    declarations: [
        PageNotFoundComponent
    ],
    imports: [
        PageNotFoundRoutingModule,
        SharedModule.forRoot()
    ]
})
export class PageNotFoundModule { }
