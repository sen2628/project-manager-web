import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProjectManagerViewProjectTaskComponent } from './app-project-manager-view-project-task.component';

describe('AppProjectManagerViewProjectTaskComponent', () => {
  let component: AppProjectManagerViewProjectTaskComponent;
  let fixture: ComponentFixture<AppProjectManagerViewProjectTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProjectManagerViewProjectTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProjectManagerViewProjectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
