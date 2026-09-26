import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminShopdetailsComponent } from './sadmin-shopdetails.component';

describe('SadminShopdetailsComponent', () => {
  let component: SadminShopdetailsComponent;
  let fixture: ComponentFixture<SadminShopdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminShopdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminShopdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
