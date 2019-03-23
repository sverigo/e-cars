import { Component, Input } from '@angular/core';
import { NewsComment } from '../../core/models/news-comment.model';
import { CommentsService } from '../../core/services/comments.service';
import { User } from '../../core/models/user.model';

@Component({
    selector: 'app-add-comment',
    templateUrl: './add-comment.component.html',
    styleUrls: ['./add-comment.component.scss']
})

export class AddCommentComponent {
    @Input() id: string;
    @Input() tittle: string;
    @Input() user: User;
    activateButton = true;

    constructor(private commentsService: CommentsService) { }

    OnKeyUp(value) {
        this.activateButton = value <= 0;
    }

    addComment(textA) {
        const comment = {
            parentId: this.id,
            name: this.user.username,
            text: textA.value,
            userId: this.user.id,
            timeStamp: new Date().getTime(),
            tittle: this.tittle
        } as NewsComment;
        this.commentsService.addComment(comment);
        textA.value = '';
    }
}

