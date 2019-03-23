import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { User } from '../models/user.model';
import { mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private userCollection: AngularFirestoreCollection<User>;
    private currentUsersSubject = new ReplaySubject<User[]>(1);
    public currentUsers = this.currentUsersSubject.asObservable();

    constructor(private firestore: AngularFirestore) {
        this.userCollection = this.firestore.collection('users');
        this.setUsersList();
    }

    getUsers() {
        return this.currentUsers;
    }

    private setUsersList(): void {
        this.userCollection.snapshotChanges().subscribe(el => {
            const users: User[] = el.map(item => {
                const user = {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                } as User;
                return user;
            });
            this.currentUsersSubject.next(users);
        });
    }

    update(user: User): void {
        this.userCollection.doc(user.id).set(user, { merge: true });
    }
}

