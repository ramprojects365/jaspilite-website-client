import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminEditshopComponent } from './nadmin-editshop.component';

describe('NadminEditshopComponent', () => {
  let component: NadminEditshopComponent;
  let fixture: ComponentFixture<NadminEditshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminEditshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminEditshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
