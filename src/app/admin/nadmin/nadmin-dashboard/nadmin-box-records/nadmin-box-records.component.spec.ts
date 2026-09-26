import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminBoxRecordsComponent } from './nadmin-box-records.component';

describe('NadminBoxRecordsComponent', () => {
  let component: NadminBoxRecordsComponent;
  let fixture: ComponentFixture<NadminBoxRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminBoxRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminBoxRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
