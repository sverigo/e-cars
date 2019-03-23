import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-equipment-table',
    templateUrl: './equipment-table.component.html',
    styleUrls: ['./equipment-table.component.scss']
})
export class EquipmentTableComponent implements OnInit {
    @Input() data: any; // should be a model
    displayedColumns: string[] = ['year', 'value', 'price', 'diler'];
    dataSource;
    ngOnInit() {
        this.dataSource = this.data;
    }
}



