import { Component, OnInit, OnDestroy, AfterViewInit,
    ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource, MatSort,
    MatPaginator, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { News } from '../../../core/models/news.model';
import { NewsService } from '../../../core/services/news.service';

@Component({
    selector: 'app-profile-news-table',
    templateUrl: './profile-news-table.component.html',
    styleUrls: ['./profile-news-table.component.scss']
})
export class ProfileNewsTableComponent implements OnInit, OnDestroy, AfterViewInit {

    public displayedColumns = ['date', 'photo', 'title', 'description',
        'update', 'delete'];
    public dataSource = new MatTableDataSource<News>();
    private newsChanges: Subscription;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private newsService: NewsService,
                private router: Router,
                public dialog: MatDialog) { }

    ngOnInit() {
        this.newsChanges = this.newsService.getNews().subscribe((data: News[]) => {
            this.dataSource.data = data;
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    ngOnDestroy() {
        this.newsChanges.unsubscribe();
    }

    filterNews = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    sortByDate(event) {
        this.dataSource.data.sort((a, b) => {
            const result = a.details.date.seconds - b.details.date.seconds;
            return event.direction === 'asc' ? result : -result;
        });
    }

    addNews() {
        this.router.navigateByUrl('/profile/news/add');
    }

    editNews(id) {
        this.router.navigate(['/profile/news/edit', id]);
    }

    deleteNews(id) {
        this.newsService.deleteNews(id);
    }

    openDialog(news: News): void {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                header: 'Удаление',
                content: `Вы действительно хотите удалить "${news.title}"?`,
                methodName: 'deleteNews',
                service: this.newsService,
                id: news.id
            }
        });
    }
}
