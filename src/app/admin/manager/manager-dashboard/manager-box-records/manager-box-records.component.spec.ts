import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBoxRecordsComponent } from './manager-box-records.component';

describe('ManagerBoxRecordsComponent', () => {
  let component: ManagerBoxRecordsComponent;
  let fixture: ComponentFixture<ManagerBoxRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBoxRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBoxRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
