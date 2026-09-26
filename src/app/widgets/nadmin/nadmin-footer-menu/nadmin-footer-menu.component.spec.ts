import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminFooterMenuComponent } from './nadmin-footer-menu.component';

describe('NadminFooterMenuComponent', () => {
  let component: NadminFooterMenuComponent;
  let fixture: ComponentFixture<NadminFooterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminFooterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminFooterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
