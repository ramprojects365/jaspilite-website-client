import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminSalesComponent } from './sadmin-sales.component';

describe('SadminSalesComponent', () => {
  let component: SadminSalesComponent;
  let fixture: ComponentFixture<SadminSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
