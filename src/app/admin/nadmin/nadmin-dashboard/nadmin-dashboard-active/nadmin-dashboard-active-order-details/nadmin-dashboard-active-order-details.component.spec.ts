import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminDashboardActiveOrderDetailsComponent } from './nadmin-dashboard-active-order-details.component';

describe('NadminDashboardActiveOrderDetailsComponent', () => {
  let component: NadminDashboardActiveOrderDetailsComponent;
  let fixture: ComponentFixture<NadminDashboardActiveOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminDashboardActiveOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminDashboardActiveOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
