import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminBoxRecordsComponent } from './sadmin-box-records.component';

describe('SadminBoxRecordsComponent', () => {
  let component: SadminBoxRecordsComponent;
  let fixture: ComponentFixture<SadminBoxRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminBoxRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminBoxRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
