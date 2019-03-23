import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsSettingsComponent } from './cars-settings.component';

describe('CarsSettingsComponent', () => {
    let component: CarsSettingsComponent;
    let fixture: ComponentFixture<CarsSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CarsSettingsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CarsSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
