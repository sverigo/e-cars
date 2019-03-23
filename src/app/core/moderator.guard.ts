import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ModeratorGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        const moderatorRole = 2;

        return this.auth.isAuth().pipe(
            take(1),
            map(user => user.role === moderatorRole),
            tap(admin => {
                if (!admin) {
                    this.router.navigate(['/not-found']);
                }
            })
        );
    }
}
