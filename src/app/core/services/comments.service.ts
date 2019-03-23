import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { NewsComment } from '../models/news-comment.model';
@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    private commentsCollection: AngularFirestoreCollection<NewsComment>;

    constructor(firestore: AngularFirestore) {
        this.commentsCollection = firestore.collection('comments');
    }

    addComment(comment: NewsComment) {
        return this.commentsCollection.add(comment)
        .then(res => res)
        .catch(err => err);
    }

    updateComment(comment: NewsComment) {
        this.commentsCollection.doc(comment.id).update(comment)
        .then(res => res)
        .catch(err => err);
    }

    deleteComment(id: string) {
        this.commentsCollection.doc(id).delete()
        .then(res => res)
        .catch(err => err);
    }
}
