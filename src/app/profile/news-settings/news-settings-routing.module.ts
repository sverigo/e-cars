import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { NewsSettingsComponent } from './news-settings.component';
import { ProfileNewsTableComponent } from './profile-news-table/profile-news-table.component';
import { ProfileNewsFormComponent } from './profile-news-form/profile-news-form.component';


const routes: Routes = [
    { path: '', component: NewsSettingsComponent, children: [
        { path: '', component: ProfileNewsTableComponent },
        { path: 'add', component: ProfileNewsFormComponent },
        { path: 'edit/:id', component: ProfileNewsFormComponent }
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
export class NewsSettingsRoutingModule { }