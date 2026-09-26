import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteSuccessComponent } from './user-delete-success.component';

describe('UserDeleteSuccessComponent', () => {
  let component: UserDeleteSuccessComponent;
  let fixture: ComponentFixture<UserDeleteSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeleteSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
