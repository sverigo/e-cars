import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsSettingsDefaultComponent } from './cars-settings-default.component';

describe('CarsSettingsDefaultComponent', () => {
    let component: CarsSettingsDefaultComponent;
    let fixture: ComponentFixture<CarsSettingsDefaultComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CarsSettingsDefaultComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CarsSettingsDefaultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
