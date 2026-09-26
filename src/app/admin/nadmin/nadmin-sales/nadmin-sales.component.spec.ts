import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminSalesComponent } from './nadmin-sales.component';

describe('NadminSalesComponent', () => {
  let component: NadminSalesComponent;
  let fixture: ComponentFixture<NadminSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
