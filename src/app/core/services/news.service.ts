import { Injectable, OnDestroy } from '@angular/core';
import { News } from '../models/news.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { NewsComment } from '../models/news-comment.model';

@Injectable({
    providedIn: 'root'
})
export class NewsService implements OnDestroy {

    private newsCollection: AngularFirestoreCollection;
    private currentNewsSubject = new ReplaySubject<News[]>(1);
    private photoLink: Observable<string>;
    private subscription: Subscription;
    public currentNewsList = this.currentNewsSubject.asObservable();

    constructor(private firestore: AngularFirestore,
                private storage: AngularFireStorage) {
        this.newsCollection = firestore.collection(
            'news', ref => ref.orderBy('details.date', 'desc'));
        this.loadData();
    }

    loadData() {
        this.newsCollection.snapshotChanges().subscribe(el => {
            const newsArray: News[] = el.map( newsItem => {
                const news = {
                    id: newsItem.payload.doc.id,
                    ...newsItem.payload.doc.data()
                } as News;
                return news;
            });
            this.currentNewsSubject.next(newsArray);
        });
    }

    getNews() {
        return this.currentNewsList.pipe(map(news => {
            return news.map((newsItem) => {
                const newsArray = {
                    id: newsItem.id,
                    title: newsItem.title,
                    description: newsItem.description,
                    photo: newsItem.photo,
                    details: {
                        date: newsItem.details.date
                    }
                };
                return newsArray;
            });
        }));
    }

    getNewsById( id: string ) {
        return this.currentNewsList.pipe(mergeMap(news => {
            return news.filter( el => el.id === id);
        }));
    }

    getNewsDetailById(id: string) {
        return this.currentNewsList.pipe(mergeMap(news => {
            return news.filter( el => el.id === id)
            .map(newItem => {
                return {
                    photo: newItem.photo,
                    title: newItem.title,
                    details: newItem.details,
                };
            });
        }));
    }

    getCommentsByNews(id: string) {
        return this.firestore.collection('comments', ref => ref.where('parentId', '==', id))
        .snapshotChanges()
        .pipe(
            map(comments => {
             const commentsArray = comments.map( commentItem => {
                const comment = {
                    id: commentItem.payload.doc.id,
                    ...commentItem.payload.doc.data()
                } as NewsComment;
                return comment;
            });
            commentsArray.sort( (a, b) => {
                return a.timeStamp - b.timeStamp;
            });
            return commentsArray;
        }));
    }

    getCommentsByUser(id: string) {
        return this.firestore.collection('comments', ref => ref.where('userId', '==', id))
        .snapshotChanges()
        .pipe(
            map(comments => {
             const commentsArray = comments.map( commentItem => {
                const comment = {
                    id: commentItem.payload.doc.id,
                    ...commentItem.payload.doc.data()
                } as NewsComment;
                return comment;
            });
            commentsArray.sort( (a, b) => {
                return a.timeStamp - b.timeStamp;
            });
            return commentsArray;
        }));
    }

    addNews(news: News, file: File) {
        if (file) {
            this.uploadPhoto(file);
            this.subscription = this.photoLink.subscribe(data => {
                news.photo = data;
                this.add(news);
            });
        } else {
            this.add(news);
        }
    }

    add(news: News) {
        news.details.date = new Date();
        return this.newsCollection.add(news)
        .then(res => res)
        .catch(err => err);
    }

    updateNews(news: News, file: File) {
        if (file) {
            this.uploadPhoto(file);
            this.subscription = this.photoLink.subscribe(data => {
                if (news.photo && news.photo !== data) {
                    this.deletePhoto(news.photo);
                }
                news.photo = data;
                this.update(news);
            });
        } else {
            this.update(news);
        }
    }

    update(news: News) {
        this.newsCollection.doc(news.id).set(news, { merge: true })
        .then(res => res)
        .catch(err => err);
    }

    uploadPhoto(file: File) {
        const filePath = `/news/${file.name}`;
        this.photoLink = new Observable(observer => {

            this.storage.upload(filePath, file).then(() => {
                this.storage.ref(filePath).getDownloadURL().subscribe(url => {
                    observer.next(url);
                    observer.complete();
                });
            });
        });
    }

    deletePhoto(url: string) {
        this.storage.storage.refFromURL(url).delete();
    }

    deleteNews(id: string) {
        this.newsCollection.doc(id).delete()
        .then(res => res)
        .catch(err => err);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
