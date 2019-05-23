import { NgModule } from '@angular/core';

import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from '../shared/shared.module';

import { NewsComponent } from './news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsCommentsComponent } from './news-comments/news-comments.component';
import { CardNewsComponent } from './card-news/card-news.component';

@NgModule({
    declarations: [
        NewsComponent,
        NewsDetailsComponent,
        NewsListComponent,
        NewsCommentsComponent,
        CardNewsComponent
    ],
    imports: [
        NewsRoutingModule,
        SharedModule.forRoot()
    ]
})
export class NewsModule { }
