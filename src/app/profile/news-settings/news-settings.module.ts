import { NgModule } from '@angular/core';

import { NewsSettingsRoutingModule } from './news-settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { NewsSettingsComponent } from './news-settings.component';
import { ProfileNewsFormComponent } from './profile-news-form/profile-news-form.component';
import { ProfileNewsTableComponent } from './profile-news-table/profile-news-table.component';

@NgModule({
    declarations: [
        NewsSettingsComponent,
        ProfileNewsFormComponent,
        ProfileNewsTableComponent
    ],
    imports: [
        NewsSettingsRoutingModule,
        SharedModule.forRoot()
    ]
})
export class NewsSettingsModule { }