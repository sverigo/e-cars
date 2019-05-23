import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { UsersSettingsComponent } from './users-settings.component';

const routes: Routes = [
    { path: '', component: UsersSettingsComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class UsersSettingsRoutingModule { }