import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/services.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'cars', pathMatch: 'full' },
    { path: 'cars', loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule) },
    { path: 'car', loadChildren: () => import('./car-details/car-details.module').then(m => m.CarDetailsModule) },
    { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
    { path: 'charging', loadChildren: () => import('./charging/charging.module').then(m => m.ChargingModule) },
    { path: 'compare', loadChildren: () => import('./compare/compare.module').then(m => m.CompareModule) },
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard], canLoad: [AuthGuard] },
    { path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) }
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
