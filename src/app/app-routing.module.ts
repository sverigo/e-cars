import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services.guard';
import { ModeratorGuard } from 'src/app/core/moderator.guard';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { NewsComponent } from './news/news.component';
import { CompareComponent } from './compare/compare.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { ReviewsComponent } from './profile/reviews/reviews.component';
import { MapComponent } from './map/map.component';
import { CarsSettingsComponent } from './profile/cars-settings/cars-settings.component';
import { CarsSettingsDefaultComponent } from './profile/cars-settings/cars-settings-default/cars-settings-default.component';
import { CarsFormComponent } from './profile/cars-settings/cars-form/cars-form.component';
import { NewsSettingsComponent } from './profile/news-settings/news-settings.component';
import { ProfileNewsTableComponent } from './profile/news-settings/profile-news-table/profile-news-table.component';
import { ProfileNewsFormComponent } from './profile/news-settings/profile-news-form/profile-news-form.component';
import { UsersSettingsComponent } from './profile/users-settings/users-settings/users-settings.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'cars/1', pathMatch: 'full' },
    { path: 'cars', redirectTo: 'cars/1', pathMatch: 'full' },
    { path: 'cars/:pageId', component: CarsComponent },
    { path: 'car/:id', component: CarDetailsComponent },
    { path: 'news', component: NewsComponent },
    { path: 'charging', component: MapComponent },
    { path: 'compare', component: CompareComponent },
    { path: 'profile', component: ProfileComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: 'settings' },
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
    ], canActivate: [AuthGuard]},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
