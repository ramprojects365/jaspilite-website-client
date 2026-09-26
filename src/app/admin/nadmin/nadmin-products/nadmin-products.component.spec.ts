import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminProductsComponent } from './nadmin-products.component';

describe('NadminProductsComponent', () => {
  let component: NadminProductsComponent;
  let fixture: ComponentFixture<NadminProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
