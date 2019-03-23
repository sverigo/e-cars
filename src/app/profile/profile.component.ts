import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../core/models/user.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    currentUser: User;

    private authChanges: Subscription;

    constructor(private auth: AuthService) { }

    ngOnInit() {
        this.authChanges = this.auth.isAuth().subscribe((user: User) => {
            this.currentUser = user;
        });
    }

    ngOnDestroy() {
        this.authChanges.unsubscribe();
    }

}
