import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ProfileSettingsService } from '../../core/services/profile-settings.service';
import { User } from '../../core/models/user.model';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    user = new User();
    private minPasswordLength = 6;
    form: FormGroup;
    imageSrc: any;
    private file: File;
    constructor(private authService: AuthService, private profileService: ProfileSettingsService) { }

    ngOnInit() {
        this.authService.isAuth().subscribe(data => this.user = data);
        this.form = new FormGroup({
            imgPath: new FormControl(''),
            newEmail: new FormControl('', Validators.email),
            newPass: new FormControl('', [Validators.minLength(this.minPasswordLength).bind(this), this.checkRepeatedPass.bind(this)]),
            repeatPass: new FormControl('', this.checkRepeatedPass.bind(this)),
            notifications: new FormControl(true, Validators.requiredTrue),
            currentPass: new FormControl('',
                [Validators.required, Validators.minLength(this.minPasswordLength).bind(this)],
                this.checkCurrentPass.bind(this)
            )
        });
    }

    onSubmit() {
        this.profileService.editProfile(this.form, this.file, this.user);
    }

    readURL(event: any): void {
        if (event.target.files && event.target.files[0]) {
            this.file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = e => this.imageSrc = reader.result;
        }
    }

    checkRepeatedPass(control: FormControl) {
        if (this.form && this.form.get('newPass').value !== this.form.get('repeatPass').value
            && this.form.get('repeatPass').value !== '') {
            return {
                notEqual: true
            };
        }
        return null;
    }

    checkCurrentPass(control: FormControl) {
        return new Promise((resolve, reject) => {
            if (this.user.password === control.value) {
                resolve(null);
            } else {
                resolve({
                    invalidPass: true
                });
            }
        });
    }
}
