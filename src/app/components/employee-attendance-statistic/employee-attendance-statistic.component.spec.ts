import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendanceStatisticComponent } from './employee-attendance-statistic.component';

describe('EmployeeAttendanceStatisticComponent', () => {
  let component: EmployeeAttendanceStatisticComponent;
  let fixture: ComponentFixture<EmployeeAttendanceStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAttendanceStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAttendanceStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
