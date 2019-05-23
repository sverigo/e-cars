import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentYear: number = new Date().getFullYear();

    constructor(private router: Router) { }

    /*ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof RouteConfigLoadStart) {
                this.loading = true;
            } else if (event instanceof NavigationEnd) {
                this.loading = false;
            }
        });
    }*/
}
