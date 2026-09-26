import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDashboardActiveComponent } from './manager-dashboard-active.component';

describe('ManagerDashboardActiveComponent', () => {
  let component: ManagerDashboardActiveComponent;
  let fixture: ComponentFixture<ManagerDashboardActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerDashboardActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDashboardActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
