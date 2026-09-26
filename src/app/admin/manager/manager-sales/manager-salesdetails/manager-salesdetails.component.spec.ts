import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSalesdetailsComponent } from './manager-salesdetails.component';

describe('ManagerSalesdetailsComponent', () => {
  let component: ManagerSalesdetailsComponent;
  let fixture: ComponentFixture<ManagerSalesdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSalesdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSalesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
