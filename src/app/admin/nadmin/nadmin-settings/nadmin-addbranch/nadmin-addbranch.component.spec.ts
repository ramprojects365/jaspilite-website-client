import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminAddbranchComponent } from './nadmin-addbranch.component';

describe('NadminAddbranchComponent', () => {
  let component: NadminAddbranchComponent;
  let fixture: ComponentFixture<NadminAddbranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminAddbranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminAddbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
