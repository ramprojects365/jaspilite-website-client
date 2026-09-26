import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminUsersComponent } from './sadmin-users.component';

describe('SadminUsersComponent', () => {
  let component: SadminUsersComponent;
  let fixture: ComponentFixture<SadminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
