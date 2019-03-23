import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNewsFormComponent } from './profile-news-form.component';

describe('ProfileNewsFormComponent', () => {
  let component: ProfileNewsFormComponent;
  let fixture: ComponentFixture<ProfileNewsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNewsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNewsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
