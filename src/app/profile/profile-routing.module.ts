import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { SettingsComponent } from '../profile/settings/settings.component';

import { ModeratorGuard } from 'src/app/core/moderator.guard';

const routes: Routes = [
    { path: '', component: ProfileComponent, children: [
        { path: '', redirectTo: 'settings' },
        { path: 'settings', component: SettingsComponent },
        { path: 'reviews', loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule) },
        { path: 'cars', loadChildren: () => import('./cars-settings/cars-settings.module').then(m => m.CarsSettingsModule), canActivate: [ModeratorGuard], canLoad: [ModeratorGuard]},
        { path: 'news', loadChildren: () => import('./news-settings/news-settings.module').then(m => m.NewsSettingsModule), canActivate: [ModeratorGuard], canLoad: [ModeratorGuard]},
        { path: 'admin', loadChildren: () => import('./users-settings/users-settings.module').then(m => m.UsersSettingsModule), canActivate: [ModeratorGuard], canLoad: [ModeratorGuard] }
    ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileRoutingModule { }