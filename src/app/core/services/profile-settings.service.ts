import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService implements OnDestroy {

    private avatarLink: Observable<string>;
    private subscription: Subscription;

    constructor( private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore, private storage: AngularFireStorage ) {}

    editProfile(form: FormGroup, file: File, user: User) {
        const newEmail = form.controls.newEmail.value;
        const newPass = form.controls.newPass.value;

        if (newEmail || newPass || file) {
            if (newEmail) {
                user.email = newEmail;
                this.firebaseAuth.auth.currentUser.updateEmail(newEmail).then(() => {
                    console.log('Email update successful');
                }).catch((error) => {
                    console.log('email is not updated' + error);
                });
            }
            if (newPass) {
                user.password = newPass;
                this.firebaseAuth.auth.currentUser.updatePassword(newPass).then(() => {
                    console.log('Pass update successful');
                }).catch((error) => {
                    console.log('pass is not updated' + error);
                });
            }
            if (file) {
                this.uploadAva(file);
                this.subscription = this.avatarLink.subscribe(data => {
                    if (user.avatarLink !== data && user.avatarLink !== undefined) {
                        this.deleteOldAva(user.avatarLink);
                    }
                    user.avatarLink = data;
                    this.update(user);
                    this.clearForm(form);
                });
            } else {
                this.update(user);
                this.clearForm(form);
            }
        } else {
            this.clearForm(form);
        }
    }

    uploadAva(file: File) {
        const filePath = `/avatars/${file.name}`;
        this.avatarLink = new Observable(observer => {

            this.storage.upload(filePath, file).then(() => {
                this.storage.ref(filePath).getDownloadURL().subscribe(url => {
                    observer.next(url);
                    observer.complete();
                });
            });

        });
    }

    deleteOldAva(downloadUrl: string) {
        this.storage.storage.refFromURL(downloadUrl).delete();
    }

    update(user: User) {
        this.firestore.collection('users').doc(user.id).update(user)
            .then(() => {
                console.log('updated');
            }).catch( (error) => {
                console.log(error);
            });
    }

    clearForm(form: FormGroup) {
        form.reset();
        Object.keys(form.controls).forEach(key => {
            form.controls[key].setErrors(null);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            console.log('unsubscribed');
            this.subscription.unsubscribe();
        }
    }

}
