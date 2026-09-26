import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminAddshopComponent } from './nadmin-addshop.component';

describe('NadminAddshopComponent', () => {
  let component: NadminAddshopComponent;
  let fixture: ComponentFixture<NadminAddshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminAddshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminAddshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
