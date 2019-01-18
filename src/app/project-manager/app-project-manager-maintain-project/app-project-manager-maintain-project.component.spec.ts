import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProjectManagerMaintainProjectComponent } from './app-project-manager-maintain-project.component';

describe('AppProjectManagerMaintainProjectComponent', () => {
  let component: AppProjectManagerMaintainProjectComponent;
  let fixture: ComponentFixture<AppProjectManagerMaintainProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProjectManagerMaintainProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProjectManagerMaintainProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
