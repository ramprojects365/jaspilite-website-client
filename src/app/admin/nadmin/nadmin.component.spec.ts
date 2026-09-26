import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminComponent } from './nadmin.component';

describe('NadminComponent', () => {
  let component: NadminComponent;
  let fixture: ComponentFixture<NadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
