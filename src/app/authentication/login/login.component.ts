import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

    signUpnView = false;

    private formLogin: FormGroup;
    private formSignUp: FormGroup;

    constructor(
        private snackBar: MatSnackBar,
        private authService: AuthService,
        private dialogRef: MatDialogRef<LoginComponent>,
        @Inject( MAT_DIALOG_DATA ) public data: any ) {}

    ngOnInit(): void {
        this.formLogin = new FormGroup({
            email: new FormControl('', [ Validators.required,
                                         Validators.pattern( '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}' ) ]),
            password: new FormControl('', [ Validators.required,
                                            Validators.minLength(6),
                                            Validators.pattern( '(?=.*?[0-9])(?=.*?[A-Za-z]).+' ) ])
        });

        this.formSignUp = new FormGroup({
            username: new FormControl('', [ Validators.required,
                                            Validators.minLength(4),
                                            Validators.pattern( '[a-zA-Z0-9_]+' ) ] ),
            email: new FormControl('', [ Validators.required,
                                         Validators.pattern( '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}' ) ] ),
            password: new FormControl('', [ Validators.required,
                                            Validators.minLength(6),
                                            Validators.pattern( '(?=.*?[0-9])(?=.*?[A-Za-z]).+' ) ] ),
            checkPass: new FormControl('', [ Validators.required,
                                             Validators.minLength(6),
                                             this.checkEqual.bind( this ) ] )
            });
    }

    checkEqual( control: FormControl ) {
        if ( this.formSignUp ) {
            if ( this.formSignUp.value.password !== control.value ) {
                return {
                    passCheck: true
                };
            }
        }
        return null;
    }

    backToLogin(): void {
        this.signUpnView = false;
    }

    openSignUp(): void {
        this.signUpnView = true;
    }

    login(): void {
        const loginData = this.formLogin.value;

        this.authService.logIn( loginData )
        .then(result => {
            if ( result.user ) {
                this.snackBar.open( 'Result', 'SUCCESS', { duration: 2000 });
                     this.dialogRef.close();
            } else {
                this.snackBar.open( 'Result', 'Invalid login or password', { duration: 3000 });
            }
        });
    }

    signUp(): void {
        let {checkPass, ...user} = this.formSignUp.value;
        user = {
            isBanned: false,
            role: 1,
            ...user
        } as User;

        this.authService.registerUser( user )
        .then(result => {
            if (result) {
                this.snackBar.open( 'Result:', 'Register success', { duration: 2000 });
                    this.dialogRef.close();
            } else {
                this.snackBar.open( 'Result:', 'Register failed', { duration: 3000 });
            }
        });
    }
}

