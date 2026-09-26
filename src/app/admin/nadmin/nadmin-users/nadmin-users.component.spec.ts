import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminUsersComponent } from './nadmin-users.component';

describe('NadminUsersComponent', () => {
  let component: NadminUsersComponent;
  let fixture: ComponentFixture<NadminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
