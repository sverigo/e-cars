import { Component, Input, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { NewsComment } from '../../core/models/news-comment.model';
import { MatPaginator } from '@angular/material/paginator';
import { NewsService } from '../../core/services/news.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-news-comments',
    templateUrl: './news-comments.component.html',
    styleUrls: ['./news-comments.component.scss']
})
export class NewsCommentsComponent implements OnChanges, OnDestroy {
    @Input() idNews: string;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    private newsChanges: Subscription;
    private comments: NewsComment[];
    pagedComments: NewsComment[];
    length: number;
    pageSize = [5, 10, 15];

    constructor(private newsService: NewsService) { }

    onPageChanged(event) {
        const firstCut = event.pageIndex * event.pageSize;
        const secondCut = firstCut + event.pageSize;
        this.pagedComments = this.comments.slice(firstCut, secondCut);
    }

    ngOnChanges() {
        this.newsChanges = this.newsService.getCommentsByNews(this.idNews)
        .subscribe((data: NewsComment[]) => {
            this.comments = data;
            this.length = this.comments.length;
            this.pagedComments = this.comments.slice(0, this.pageSize[0]);
        });
    }

    ngOnDestroy(): void {
        this.newsChanges.unsubscribe();
    }

}
