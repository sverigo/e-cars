import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';

import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.auth.isAuth().pipe(
            take(1),
            map(user => !!user),
            tap(loggedIn => loggedIn)
        );
    }

    canLoad() {
        return this.auth.isAuth().pipe(
            take(1),
            map(user => !!user),
            tap(loggedIn => loggedIn)
        );
    }
}
