import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeClaimApplicationComponent } from './employee-claim-application.component';

describe('EmployeeClaimApplicationComponent', () => {
  let component: EmployeeClaimApplicationComponent;
  let fixture: ComponentFixture<EmployeeClaimApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeClaimApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeClaimApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
