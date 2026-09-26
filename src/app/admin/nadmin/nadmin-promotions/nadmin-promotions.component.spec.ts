import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminPromotionsComponent } from './nadmin-promotions.component';

describe('NadminPromotionsComponent', () => {
  let component: NadminPromotionsComponent;
  let fixture: ComponentFixture<NadminPromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminPromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
