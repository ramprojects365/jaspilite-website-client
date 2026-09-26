import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminEditbranchComponent } from './nadmin-editbranch.component';

describe('NadminEditbranchComponent', () => {
  let component: NadminEditbranchComponent;
  let fixture: ComponentFixture<NadminEditbranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminEditbranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminEditbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
