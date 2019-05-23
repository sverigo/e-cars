import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services.guard';

import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './cars/car-details/car-details.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'cars/1', pathMatch: 'full' },
    { path: 'cars', redirectTo: 'cars/1', pathMatch: 'full' },
    { path: 'cars/:pageId', component: CarsComponent },
    { path: 'car/:id', component: CarDetailsComponent },
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
