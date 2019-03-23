import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent} from './authentication.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';
import {
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
} from '@angular/material';

@NgModule({
    declarations: [
        AuthenticationComponent,
        LoginComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatSnackBarModule,
    ],
    entryComponents: [LoginComponent],
    exports: [AuthenticationComponent]
  })
export class AuthenticationModule { }
