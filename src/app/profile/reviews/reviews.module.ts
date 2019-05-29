import { NgModule } from '@angular/core';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ReviewsComponent } from './reviews.component';

@NgModule({
    declarations: [
        ReviewsComponent
    ],
    imports: [
        ReviewsRoutingModule,
        SharedModule.forRoot()
    ]
})
export class ReviewsModule { }
