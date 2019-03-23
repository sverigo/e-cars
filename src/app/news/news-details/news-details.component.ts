import { Component, Input, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { News } from '../../core/models/news.model';
import { Subscription } from 'rxjs';
import { NewsService } from '../../core/services/news.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../core/models/user.model';


@Component({
    selector: 'app-news-details',
    templateUrl: './news-details.component.html',
    styleUrls: ['./news-details.component.scss']
})

export class NewsDetailsComponent implements OnDestroy, OnChanges, OnInit {
    @Input() currentNews: News;
    isLoginned: boolean;
    idNews: string;
    user: User;
    newsDetails: News;
    private newsChanges: Subscription;
    private checkAuth: Subscription;

    constructor(private newsService: NewsService,
                private authService: AuthService) { }

    ngOnInit(): void {
        this.checkAuth = this.authService.isAuth()
        .subscribe((data: User) => {
            if (data) {
                this.user = data;
                this.isLoginned = true;
            } else this.isLoginned = false;
        });
    }

    ngOnChanges(): void {
        this.newsChanges = this.newsService.getNewsDetailById(this.currentNews.id)
        .subscribe((data: News) => {
            this.newsDetails = data;
        });
        this.idNews = this.currentNews.id;
    }

    ngOnDestroy(): void {
        this.newsChanges.unsubscribe();
    }
}
