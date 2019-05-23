import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { FlexLayoutModule } from '@angular/flex-layout';

import { PaginationComponent } from './pagination/pagination.component';
import { CarEquipmentPropertiesComponent } from './car-equipment-properties/car-equipment-properties.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentComponent } from './comment/comment.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule
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
        CarEquipmentPropertiesComponent,
        CommentComponent,
        CommonModule,
        ConfirmDialogComponent,
        FlexLayoutModule,
        FormsModule,
        PaginationComponent,
        ReactiveFormsModule,
        MaterialModule
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
