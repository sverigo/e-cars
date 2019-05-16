import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModeratorGuard } from 'src/app/core/moderator.guard';

import { SettingsComponent } from '../profile/settings/settings.component';
import { ReviewsComponent } from '../profile/reviews/reviews.component';
import { CarsSettingsComponent } from '../profile/cars-settings/cars-settings.component';
import { CarsSettingsDefaultComponent } from '../profile/cars-settings/cars-settings-default/cars-settings-default.component';
import { CarsFormComponent } from '../profile/cars-settings/cars-form/cars-form.component';
import { NewsSettingsComponent } from '../profile/news-settings/news-settings.component';
import { ProfileNewsTableComponent } from '../profile/news-settings/profile-news-table/profile-news-table.component';
import { ProfileNewsFormComponent } from '../profile/news-settings/profile-news-form/profile-news-form.component';
import { UsersSettingsComponent } from '../profile/users-settings/users-settings/users-settings.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
    { path: '', component: ProfileComponent, children: [
        { path: '', redirectTo: 'settings' },
        { path: 'settings', component: SettingsComponent },
        { path: 'reviews', component: ReviewsComponent },
        { path: 'cars', component: CarsSettingsComponent, children: [
            { path: '', component: CarsSettingsDefaultComponent },
            { path: 'create', component: CarsFormComponent },
            { path: 'edit/:id', component: CarsFormComponent }
        ], canActivate: [ModeratorGuard]},
        { path: 'news', component: NewsSettingsComponent, children: [
            { path: '', component: ProfileNewsTableComponent },
            { path: 'add', component: ProfileNewsFormComponent },
            { path: 'edit/:id', component: ProfileNewsFormComponent }
        ], canActivate: [ModeratorGuard]},
        { path: 'admin', component: UsersSettingsComponent, canActivate: [ModeratorGuard] }
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