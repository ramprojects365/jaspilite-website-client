import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminCostingComponent } from './sadmin-costing.component';

describe('SadminCostingComponent', () => {
  let component: SadminCostingComponent;
  let fixture: ComponentFixture<SadminCostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminCostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminCostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
