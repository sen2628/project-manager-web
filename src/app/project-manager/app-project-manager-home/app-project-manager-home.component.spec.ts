import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProjectManagerHomeComponent } from './app-project-manager-home.component';

describe('AppProjectManagerHomeComponent', () => {
  let component: AppProjectManagerHomeComponent;
  let fixture: ComponentFixture<AppProjectManagerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProjectManagerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProjectManagerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
