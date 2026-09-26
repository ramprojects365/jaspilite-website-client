import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminDashboardComponent } from './nadmin-dashboard.component';

describe('NadminDashboardComponent', () => {
  let component: NadminDashboardComponent;
  let fixture: ComponentFixture<NadminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
