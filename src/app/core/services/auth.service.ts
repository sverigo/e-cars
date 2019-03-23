import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user: Observable<User>;

    constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
        this.user = firebaseAuth.authState.pipe(
            switchMap( user => {
                if ( user ) {
                    return this.firestore.doc<User>(`users/${user.uid}`).snapshotChanges().pipe(map(userPayload => {
                        const user = {
                            id: userPayload.payload.id,
                            ...userPayload.payload.data(),
                        } as User;
                        return user;
                    }));
                } else {
                    return of(null);
                }
            })
        );
    }

    registerUser(user: User) {
        return this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password ).then( data => {
            return this.firestore.collection('users').doc(data.user.uid).set(user)
                .then( () => {
                    return true;
                })
                .catch( () => {
                    return false;
                });
        })
        .catch( () => {
            return false;
        });
    }

    logIn({ email, password }) {
        return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });
    }

    logout() {
        this.firebaseAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
        });
    }

    isAuth() {
        return this.user;
    }
}
