import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePointsHistoryComponent } from './employee-points-history.component';

describe('EmployeePointsHistoryComponent', () => {
  let component: EmployeePointsHistoryComponent;
  let fixture: ComponentFixture<EmployeePointsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePointsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePointsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
