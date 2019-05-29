import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/services.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'cars', pathMatch: 'full' },
    { path: 'cars', loadChildren: './cars/cars.module#CarsModule' },
    { path: 'car', loadChildren: './car-details/car-details.module#CarDetailsModule' },
    { path: 'news', loadChildren: './news/news.module#NewsModule' },
    { path: 'charging', loadChildren: './charging/charging.module#ChargingModule' },
    { path: 'compare', loadChildren: './compare/compare.module#CompareModule' },
    { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard], canLoad: [AuthGuard] },
    { path: '**', loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule' }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
