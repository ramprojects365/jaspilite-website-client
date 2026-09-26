import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminHeaderMenuComponent } from './nadmin-header-menu.component';

describe('NadminHeaderMenuComponent', () => {
  let component: NadminHeaderMenuComponent;
  let fixture: ComponentFixture<NadminHeaderMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminHeaderMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
