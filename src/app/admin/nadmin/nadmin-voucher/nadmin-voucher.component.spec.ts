import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminVoucherComponent } from './nadmin-voucher.component';

describe('NadminVoucherComponent', () => {
  let component: NadminVoucherComponent;
  let fixture: ComponentFixture<NadminVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
