import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSalesComponent } from './manager-sales.component';

describe('ManagerSalesComponent', () => {
  let component: ManagerSalesComponent;
  let fixture: ComponentFixture<ManagerSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
