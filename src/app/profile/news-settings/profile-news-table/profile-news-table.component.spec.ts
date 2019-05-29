import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNewsTableComponent } from './profile-news-table.component';

describe('ProfileNewsComponent', () => {
    let component: ProfileNewsTableComponent;
    let fixture: ComponentFixture<ProfileNewsTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileNewsTableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileNewsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
