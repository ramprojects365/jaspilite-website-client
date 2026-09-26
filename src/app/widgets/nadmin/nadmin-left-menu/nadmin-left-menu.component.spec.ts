import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminLeftMenuComponent } from './nadmin-left-menu.component';

describe('NadminLeftMenuComponent', () => {
  let component: NadminLeftMenuComponent;
  let fixture: ComponentFixture<NadminLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
