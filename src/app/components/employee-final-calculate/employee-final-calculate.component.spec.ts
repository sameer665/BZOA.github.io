import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFinalCalculateComponent } from './employee-final-calculate.component';

describe('EmployeeFinalCalculateComponent', () => {
  let component: EmployeeFinalCalculateComponent;
  let fixture: ComponentFixture<EmployeeFinalCalculateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFinalCalculateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFinalCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
