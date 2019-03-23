import { Component, OnInit } from '@angular/core';
import { News } from '../core/models/news.model';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent {

    selectedNewsItem: News;

    constructor() { }

    changed(newsItem: News) {
        this.selectedNewsItem = newsItem;
    }
}
