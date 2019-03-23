import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { EquipmentTableComponent } from './equipment-table.component';


@NgModule({
    imports: [
        MatTableModule,
        MatNativeDateModule,
        BrowserModule,
        CommonModule
    ],
    declarations: [
        EquipmentTableComponent
    ],
    exports: [
        EquipmentTableComponent
    ]
})

export class EquipmentTableModule {

}

