import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from '../../core/models/news.model';
import { NewsService } from '../../core/services/news.service';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss'],
    providers: [NewsService]
})
export class NewsListComponent implements OnInit, OnDestroy {
    @Output() changed = new EventEmitter<News>();

    news: News[];
    startIndex = 0;
    endIndex = 3;
    length: number;
    pageSize = 3;
    private newsChanges: Subscription;

    constructor(private newsService: NewsService) { }

    onPageChanged(event) {
        this.startIndex = event.pageIndex * event.pageSize;
        this.endIndex = this.startIndex + event.pageSize;
    }

    select(selectedNewsItem: News) {
        this.changed.emit(selectedNewsItem);
    }

    ngOnInit() {
        this.newsChanges = this.newsService.getNews().subscribe((data: News[]) => {
                this.news = data;
                this.length = this.news.length;
                this.select(this.news[0]);
            });
    }

    ngOnDestroy() {
        this.newsChanges.unsubscribe();
    }
}
