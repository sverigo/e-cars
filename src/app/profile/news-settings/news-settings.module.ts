import { NgModule } from '@angular/core';

import { NewsSettingsRoutingModule } from './news-settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { NewsSettingsComponent } from './news-settings.component';
import { ProfileNewsTableComponent } from './profile-news-table/profile-news-table.component';
import { ProfileNewsFormComponent } from './profile-news-form/profile-news-form.component';

@NgModule({
    declarations: [
        NewsSettingsComponent,
        ProfileNewsTableComponent,
        ProfileNewsFormComponent
    ],
    imports: [
        NewsSettingsRoutingModule,
        SharedModule.forRoot()
    ]
})
export class NewsSettingsModule { }