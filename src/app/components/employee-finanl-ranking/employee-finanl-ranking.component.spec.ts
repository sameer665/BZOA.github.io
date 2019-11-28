import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFinanlRankingComponent } from './employee-finanl-ranking.component';

describe('EmployeeFinanlRankingComponent', () => {
  let component: EmployeeFinanlRankingComponent;
  let fixture: ComponentFixture<EmployeeFinanlRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFinanlRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFinanlRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
