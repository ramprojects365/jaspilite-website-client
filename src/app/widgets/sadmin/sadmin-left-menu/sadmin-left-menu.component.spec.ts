import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminLeftMenuComponent } from './sadmin-left-menu.component';

describe('SadminLeftMenuComponent', () => {
  let component: SadminLeftMenuComponent;
  let fixture: ComponentFixture<SadminLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
