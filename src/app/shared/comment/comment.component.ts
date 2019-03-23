import { Component, Input } from '@angular/core';
import { NewsComment } from '../../core/models/news-comment.model';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
    @Input() comment: NewsComment;

    constructor() { }

}
