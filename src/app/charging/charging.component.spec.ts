import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingComponent } from './charging.component';

describe('ChargingComponent', () => {
    let component: ChargingComponent;
    let fixture: ComponentFixture<ChargingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChargingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChargingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
