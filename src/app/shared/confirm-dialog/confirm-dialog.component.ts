import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    cancel(): void {
        this.dialogRef.close();
    }

    accept(): void {
        this.data.service[this.data.methodName](this.data.id);
        this.dialogRef.close();
    }
}
