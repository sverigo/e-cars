import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { config } from './_fire-config';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CarsModule } from './cars/cars.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { NewsModule } from './news/news.module';
import { CompareModule } from './compare/compare.module';
import { MapComponent } from './map/map.component';

@NgModule({
    declarations: [
        AppComponent,
        MapComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        AppRoutingModule,
        CarsModule,
        NewsModule,
        CompareModule,
        AuthenticationModule,
        BrowserAnimationsModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
