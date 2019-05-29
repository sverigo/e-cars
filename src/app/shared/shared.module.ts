import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

import { AddCommentComponent } from './add-comment/add-comment.component';
import { CarEquipmentPropertiesComponent } from './car-equipment-properties/car-equipment-properties.component';
import { CommentComponent } from './comment/comment.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    declarations: [
        AddCommentComponent,
        CarEquipmentPropertiesComponent,
        CommentComponent,
        ConfirmDialogComponent,
        PaginationComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        AddCommentComponent,
        CarEquipmentPropertiesComponent,
        CommentComponent,
        ConfirmDialogComponent,
        PaginationComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
