import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBonusScoreComponent } from './employee-bonus-score.component';

describe('EmployeeBonusScoreComponent', () => {
  let component: EmployeeBonusScoreComponent;
  let fixture: ComponentFixture<EmployeeBonusScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBonusScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBonusScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
