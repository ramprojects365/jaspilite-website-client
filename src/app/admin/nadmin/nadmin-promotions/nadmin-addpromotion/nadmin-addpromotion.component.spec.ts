import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminAddpromotionComponent } from './nadmin-addpromotion.component';

describe('NadminAddpromotionComponent', () => {
  let component: NadminAddpromotionComponent;
  let fixture: ComponentFixture<NadminAddpromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminAddpromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminAddpromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
