import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AuthenticationComponent,
        LoginComponent
    ],
    imports: [
        AppRoutingModule,
        SharedModule.forRoot()
    ],
    entryComponents: [
        LoginComponent
    ],
    exports: [
        AuthenticationComponent
    ]
  })
export class AuthenticationModule { }
