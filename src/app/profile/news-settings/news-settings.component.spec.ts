import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSettingsComponent } from './news-settings.component';

describe('NewsSettingsComponent', () => {
  let component: NewsSettingsComponent;
  let fixture: ComponentFixture<NewsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
