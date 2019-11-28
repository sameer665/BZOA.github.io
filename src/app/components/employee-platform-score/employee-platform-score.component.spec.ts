import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePlatformScoreComponent } from './employee-platform-score.component';

describe('EmployeePlatformScoreComponent', () => {
  let component: EmployeePlatformScoreComponent;
  let fixture: ComponentFixture<EmployeePlatformScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePlatformScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePlatformScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
