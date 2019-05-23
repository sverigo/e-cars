import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UsersSettingsRoutingModule } from './users-settings-routing.module';

import { UsersSettingsComponent } from '../users-settings/users-settings.component';

@NgModule({
    declarations: [
        UsersSettingsComponent,
    ],
    imports: [
        SharedModule.forRoot(),
        UsersSettingsRoutingModule
    ]
})
export class UsersSettingsModule { }
