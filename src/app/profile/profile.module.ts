import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './settings/settings.component';

import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        ProfileComponent,
        SettingsComponent
    ],
    imports: [
        ProfileRoutingModule,
        SharedModule.forRoot()
    ],
    entryComponents: [
        ConfirmDialogComponent
    ]
})
export class ProfileModule { }
