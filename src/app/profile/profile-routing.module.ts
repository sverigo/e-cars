import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { SettingsComponent } from '../profile/settings/settings.component';

import { ModeratorGuard } from 'src/app/core/moderator.guard';

const routes: Routes = [
    { path: '', component: ProfileComponent, children: [
        { path: '', redirectTo: 'settings' },
        { path: 'settings', component: SettingsComponent },
        { path: 'reviews', loadChildren: './reviews/reviews.module#ReviewsModule' },
        { path: 'cars', loadChildren: './cars-settings/cars-settings.module#CarsSettingsModule', canActivate: [ModeratorGuard], canLoad: [ModeratorGuard]},
        { path: 'news', loadChildren: './news-settings/news-settings.module#NewsSettingsModule', canActivate: [ModeratorGuard], canLoad: [ModeratorGuard]},
        { path: 'admin', loadChildren: './users-settings/users-settings.module#UsersSettingsModule', canActivate: [ModeratorGuard], canLoad: [ModeratorGuard] }
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