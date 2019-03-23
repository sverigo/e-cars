import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { AsyncSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CarRateService {
    private adding;
    private docCache: {doc?: DocumentReference, user: string, car: number, mark?: number};

    constructor(private firestore: AngularFirestore) { }

    getUserCarRating(userId, carId): AsyncSubject<any> {
        const subj = new AsyncSubject();
        const subscription = this.firestore.collection('userCarMarks',
            ref => ref.where('user', '==', userId).where('car', '==', carId)
        ).snapshotChanges().subscribe( (v: DocumentChangeAction<any>[]) => {
            if (v[0] && v[0].type !== 'removed') {
                const doc = v[0].payload.doc;
                this.docCache = {
                    doc: doc.ref,
                    ...doc.data(),
                }
                subj.next(this.docCache.mark);
            } else {
                this.docCache = {user: userId, car: carId};
            }
            subj.complete();
            setTimeout( () => subscription.unsubscribe() );
        } );
        return subj;
    }

    setUserCarRating(userId, carId, newMark?) {
        if (!newMark) newMark = 0;
        if (this.docCache.user !== userId || this.docCache.car !== carId) {
            this.getUserCarRating(userId, carId).subscribe(
                () => this.setUserCarRating(userId, carId, newMark)
            )
        }
        if (this.docCache.doc) {
            this.docCache.doc.update({mark: newMark}).then( () => this.recalcCarRating(carId) );
        } else if (this.adding) {
            this.adding.then( (doc) => {
                this.adding = null;
                this.docCache.doc = doc;
                this.setUserCarRating(userId, carId, newMark);
            } )
        } else {
            this.adding = this.firestore.collection('userCarMarks').add({
                user: userId,
                car: carId,
                mark: newMark,
            });
            this.adding.then( (doc) => {
                this.adding = null;
                this.docCache.doc = doc;
                this.recalcCarRating(carId);
            } );
        }
    }

    recalcCarRating(carId) {
        const subscription = this.firestore.collection('userCarMarks',
            ref => ref.where('car', '==', carId)
        ).valueChanges().subscribe( (arr: any[]) => {
            setTimeout( () => subscription.unsubscribe() );
            const {n, s} = arr.reduce( (acc, cur) => {
                if (cur.mark) {
                    acc.n++;
                    acc.s += cur.mark;
                }
                return acc;
            }, {n: 0, s: 0});
            // console.log("rating", n, s, arr.length, arr);
            this.firestore.collection('cars2').doc(String(carId)).update({
                rating: Math.round(10*s/n)/10 || 0
            });
        });
    }
}
