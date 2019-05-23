import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ModeratorGuard implements CanActivate, CanLoad {
    moderatorRole = 2;
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.auth.isAuth().pipe(
            take(1),
            map(user => user.role === this.moderatorRole),
            tap(admin => admin)
        );
    }

    canLoad() {
        return this.auth.isAuth().pipe(
            take(1),
            map(user => user.role === this.moderatorRole),
            tap(admin => admin)
        );
    }
}
