import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { CarsSettingsComponent } from './cars-settings/cars-settings.component';
import { CarsSettingsDefaultComponent } from './cars-settings/cars-settings-default/cars-settings-default.component';
import { CarsFormComponent } from './cars-settings/cars-form/cars-form.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { NewsSettingsComponent } from './news-settings/news-settings.component';
import { ProfileNewsTableComponent } from './news-settings/profile-news-table/profile-news-table.component';
import { ProfileNewsFormComponent } from './news-settings/profile-news-form/profile-news-form.component';
import { UsersSettingsComponent } from './users-settings/users-settings/users-settings.component';

@NgModule({
    declarations: [
        CarsFormComponent,
        CarsSettingsComponent,
        CarsSettingsDefaultComponent,
        NewsSettingsComponent,
        ProfileNewsTableComponent,
        ProfileNewsFormComponent,
        ProfileComponent,
        ReviewsComponent,
        SettingsComponent,
        UsersSettingsComponent,
    ],
    imports: [
        AppRoutingModule,
        SharedModule
    ],
    entryComponents: [
        ConfirmDialogComponent
    ]
})
export class ProfileModule { }
