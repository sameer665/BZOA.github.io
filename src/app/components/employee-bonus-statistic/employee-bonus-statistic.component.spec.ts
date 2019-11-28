import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBonusStatisticComponent } from './employee-bonus-statistic.component';

describe('EmployeeBonusStatisticComponent', () => {
  let component: EmployeeBonusStatisticComponent;
  let fixture: ComponentFixture<EmployeeBonusStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBonusStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBonusStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
