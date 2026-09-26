import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminDashboardActiveComponent } from './nadmin-dashboard-active.component';

describe('NadminDashboardActiveComponent', () => {
  let component: NadminDashboardActiveComponent;
  let fixture: ComponentFixture<NadminDashboardActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminDashboardActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminDashboardActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
