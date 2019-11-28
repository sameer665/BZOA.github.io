import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInfoApplicationComponent } from './employee-info-application.component';

describe('EmployeeInfoApplicationComponent', () => {
  let component: EmployeeInfoApplicationComponent;
  let fixture: ComponentFixture<EmployeeInfoApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeInfoApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInfoApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
