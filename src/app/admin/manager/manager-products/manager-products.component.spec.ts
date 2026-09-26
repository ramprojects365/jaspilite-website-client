import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProductsComponent } from './manager-products.component';

describe('ManagerProductsComponent', () => {
  let component: ManagerProductsComponent;
  let fixture: ComponentFixture<ManagerProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
