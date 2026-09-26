import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminHeaderMenuComponent } from './sadmin-header-menu.component';

describe('SadminHeaderMenuComponent', () => {
  let component: SadminHeaderMenuComponent;
  let fixture: ComponentFixture<SadminHeaderMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminHeaderMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
