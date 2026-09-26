import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminFooterMenuComponent } from './sadmin-footer-menu.component';

describe('SadminFooterMenuComponent', () => {
  let component: SadminFooterMenuComponent;
  let fixture: ComponentFixture<SadminFooterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminFooterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminFooterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
