import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadminProductsComponent } from './padmin-products.component';

describe('PadminProductsComponent', () => {
  let component: PadminProductsComponent;
  let fixture: ComponentFixture<PadminProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadminProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
