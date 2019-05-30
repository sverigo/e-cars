import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit  } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

import { AuthService } from 'src/app/core/services/auth.service';
import { NewsService } from '../../core/services/news.service';
import { CommentsService } from '../../core/services/comments.service';
import { User } from '../../core/models/user.model';
import { NewsComment } from '../../core/models/news-comment.model';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    public displayedColumns = ['timeStamp', 'tittle', 'text', 'delete']; // , 'update', 'delete'
    public dataSource = new MatTableDataSource<NewsComment>();

    private commentsChanges: Subscription;
    private checkAuth: Subscription;
    private user: User;

    constructor(private authService: AuthService,
                private newsService: NewsService,
                private commentsService: CommentsService,
                private dialog: MatDialog) { }

    ngOnInit(): void {
        this.checkAuth = this.authService.isAuth()
        .subscribe((userData: User) => {
            this.user = userData;
            if (this.user) {
                this.commentsChanges = this.newsService.getCommentsByUser(this.user.id)
                .subscribe((commentData: NewsComment[]) => {
                    this.dataSource.data = commentData;
                });
            }
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    deleteComment(id: string) {
        this.commentsService.deleteComment(id);
    }

    openDialog(comment: NewsComment): void {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                header: 'Удаление',
                content: `Вы действительно хотите удалить коментарий
                        "${(comment.text.length > 30) ? comment.text.slice(0, 30) + '...' : comment.text}"`,
                methodName: 'deleteComment',
                service: this.commentsService,
                id: comment.id
            }
        });
    }

    ngOnDestroy(): void {
        this.commentsChanges.unsubscribe();
        this.checkAuth.unsubscribe();
    }
}
