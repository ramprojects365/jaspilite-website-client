import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminDashboardActiveComponent } from './sadmin-dashboard-active.component';

describe('SadminDashboardActiveComponent', () => {
  let component: SadminDashboardActiveComponent;
  let fixture: ComponentFixture<SadminDashboardActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminDashboardActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminDashboardActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
