import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadminLeftMenuComponent } from './padmin-left-menu.component';

describe('PadminLeftMenuComponent', () => {
  let component: PadminLeftMenuComponent;
  let fixture: ComponentFixture<PadminLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadminLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadminLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
