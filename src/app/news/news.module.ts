import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsCommentsComponent } from './news-comments/news-comments.component';
import { SharedModule } from '../shared/shared.module';
import { CardNewsComponent } from './card-news/card-news.component';



@NgModule({
    declarations: [NewsComponent, NewsListComponent, NewsDetailsComponent, NewsCommentsComponent, CardNewsComponent],
    imports: [
        SharedModule,
        CommonModule,
        FlexLayoutModule,
        MatListModule,
        MatCardModule,
        MatPaginatorModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class NewsModule { }
