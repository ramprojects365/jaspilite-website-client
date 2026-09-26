import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminAddpromoproductsComponent } from './nadmin-addpromoproducts.component';

describe('NadminAddpromoproductsComponent', () => {
  let component: NadminAddpromoproductsComponent;
  let fixture: ComponentFixture<NadminAddpromoproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminAddpromoproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminAddpromoproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
