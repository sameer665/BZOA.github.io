import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePlatformStatisticComponent } from './employee-platform-statistic.component';

describe('EmployeePlatformStatisticComponent', () => {
  let component: EmployeePlatformStatisticComponent;
  let fixture: ComponentFixture<EmployeePlatformStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePlatformStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePlatformStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
