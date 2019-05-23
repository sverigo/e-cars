import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouteConfigLoadStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models/user.model';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    isLoading = false;
    currentUser: User;

    private authChanges: Subscription;

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() {
        this.authChanges = this.auth.isAuth().subscribe((user: User) => {
            this.currentUser = user;
        });

        this.router.events.subscribe((event) => {
            if (event instanceof RouteConfigLoadStart) {
                this.isLoading = true;
            } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
                this.isLoading = false;
            }
        });
    }

    ngOnDestroy() {
        this.authChanges.unsubscribe();
    }

}
