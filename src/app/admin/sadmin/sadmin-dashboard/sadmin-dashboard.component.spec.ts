import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminDashboardComponent } from './sadmin-dashboard.component';

describe('SadminDashboardComponent', () => {
  let component: SadminDashboardComponent;
  let fixture: ComponentFixture<SadminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
