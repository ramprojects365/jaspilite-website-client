import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminSalesdetailsComponent } from './nadmin-salesdetails.component';

describe('NadminSalesdetailsComponent', () => {
  let component: NadminSalesdetailsComponent;
  let fixture: ComponentFixture<NadminSalesdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminSalesdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminSalesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
