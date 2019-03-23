import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { User } from '../core/models/user.model';

import { LoginComponent } from './login/login.component';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})

export class AuthenticationComponent implements OnInit, OnDestroy {
    isLoginned = false;
    private checkAuth: Subscription;

    constructor(public dialog: MatDialog,
                private authService: AuthService) {}

    openLogin(): void {
        const dialogRef = this.dialog.open(LoginComponent, {
            width: '350px'
        });
    }

    ngOnInit(): void {
        this.checkAuth = this.authService.isAuth()
        .subscribe((data: User) => {
            if (data) {
                this.isLoginned = true;
            } else this.isLoginned = false;
        });
    }

    logout(): void {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.checkAuth.unsubscribe();
    }
}
