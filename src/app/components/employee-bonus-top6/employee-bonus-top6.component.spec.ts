import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBonusTop6Component } from './employee-bonus-top6.component';

describe('EmployeeBonusTop6Component', () => {
  let component: EmployeeBonusTop6Component;
  let fixture: ComponentFixture<EmployeeBonusTop6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBonusTop6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBonusTop6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
