import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProjectManagerMaintainUserComponent } from './app-project-manager-maintain-user.component';

describe('AppProjectManagerMaintainUserComponent', () => {
  let component: AppProjectManagerMaintainUserComponent;
  let fixture: ComponentFixture<AppProjectManagerMaintainUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProjectManagerMaintainUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProjectManagerMaintainUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
