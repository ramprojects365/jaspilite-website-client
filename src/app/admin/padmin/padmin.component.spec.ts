import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadminComponent } from './padmin.component';

describe('PadminComponent', () => {
  let component: PadminComponent;
  let fixture: ComponentFixture<PadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
