import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLeftMenuComponent } from './manager-left-menu.component';

describe('ManagerLeftMenuComponent', () => {
  let component: ManagerLeftMenuComponent;
  let fixture: ComponentFixture<ManagerLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
