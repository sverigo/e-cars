import { Component, OnDestroy, Input } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { CarRateService } from '../../core/services/car-rate.service';

@Component({
    selector: 'app-car-rate',
    templateUrl: './car-rate.component.html',
    styleUrls: ['./car-rate.component.scss']
})
export class CarRateComponent implements OnDestroy {
    @Input() carId: number;
    
    isLoggedIn: boolean;
    private myMark;
    private subscriptionAuth;
    private user: User;

    constructor(authService: AuthService, private carRateService: CarRateService) {
        this.subscriptionAuth = authService.isAuth().subscribe((user: User) => {
            if (user) {
                this.user = user;
                this.isLoggedIn = true;
                this.carRateService.getUserCarRating(user.id, this.carId).subscribe(
                    (mark) => this.myMark = String(mark)
                );
            }
            else this.isLoggedIn = false;
        });
    }

    ngOnDestroy() {
        this.subscriptionAuth.unsubscribe();
    }

    saveMark() {
        this.carRateService.setUserCarRating(this.user.id, this.carId, +this.myMark);
    }

    deleteMark() {
        this.myMark = undefined;
        this.carRateService.setUserCarRating(this.user.id, this.carId);
    }
}
