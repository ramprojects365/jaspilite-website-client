import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminProductsComponent } from './sadmin-products.component';

describe('SadminProductsComponent', () => {
  let component: SadminProductsComponent;
  let fixture: ComponentFixture<SadminProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
