import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEquipmentPropertiesComponent } from './car-equipment-properties.component';

describe('CarEquipmentPropertiesComponent', () => {
    let component: CarEquipmentPropertiesComponent;
    let fixture: ComponentFixture<CarEquipmentPropertiesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CarEquipmentPropertiesComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CarEquipmentPropertiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
