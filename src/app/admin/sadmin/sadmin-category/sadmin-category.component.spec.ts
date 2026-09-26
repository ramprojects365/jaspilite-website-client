import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminCategoryComponent } from './sadmin-category.component';

describe('SadminCategoryComponent', () => {
  let component: SadminCategoryComponent;
  let fixture: ComponentFixture<SadminCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
