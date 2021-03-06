import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule,
         MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule,
         MatProgressSpinnerModule, MatSelectModule, MatSortModule,
         MatTableModule, MatTooltipModule } from '@angular/material';

import { PaginationComponent } from './pagination/pagination.component';
import { CarEquipmentPropertiesComponent } from './car-equipment-properties/car-equipment-properties.component';
import { EquipmentTableModule } from './equipment-table/equipment-table.module';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentComponent } from './comment/comment.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        EquipmentTableModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule
    ],
    declarations: [
        AddCommentComponent,
        CarEquipmentPropertiesComponent,
        CommentComponent,
        ConfirmDialogComponent,
        PaginationComponent
    ],
    exports: [
        AddCommentComponent,
        BrowserAnimationsModule,
        CarEquipmentPropertiesComponent,
        CommentComponent,
        CommonModule,
        ConfirmDialogComponent,
        EquipmentTableModule,
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        PaginationComponent,
        ReactiveFormsModule
    ],
})
export class SharedModule { }
