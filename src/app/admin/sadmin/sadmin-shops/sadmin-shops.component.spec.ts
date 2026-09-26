import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminShopsComponent } from './sadmin-shops.component';

describe('SadminShopsComponent', () => {
  let component: SadminShopsComponent;
  let fixture: ComponentFixture<SadminShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
