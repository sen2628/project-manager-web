import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProjectManagerModalComponent } from './app-project-manager-modal.component';

describe('AppProjectManagerModalComponent', () => {
  let component: AppProjectManagerModalComponent;
  let fixture: ComponentFixture<AppProjectManagerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProjectManagerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProjectManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
