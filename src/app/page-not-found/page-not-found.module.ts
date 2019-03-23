import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    declarations: [
        PageNotFoundComponent
    ],
    imports: [
        AppRoutingModule,
        SharedModule
    ]
})
export class PageNotFoundModule { }
