import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NadminSettingsComponent } from './nadmin-settings.component';

describe('NadminSettingsComponent', () => {
  let component: NadminSettingsComponent;
  let fixture: ComponentFixture<NadminSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NadminSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NadminSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
