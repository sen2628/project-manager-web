import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProjectManagerMaintainProjectTaskComponent } from './app-project-manager-maintain-project-task.component';

describe('AppProjectManagerMaintainProjectTaskComponent', () => {
  let component: AppProjectManagerMaintainProjectTaskComponent;
  let fixture: ComponentFixture<AppProjectManagerMaintainProjectTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProjectManagerMaintainProjectTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProjectManagerMaintainProjectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
