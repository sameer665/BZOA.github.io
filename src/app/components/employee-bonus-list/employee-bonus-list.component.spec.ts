import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBonusListComponent } from './employee-bonus-list.component';

describe('EmployeeBonusListComponent', () => {
  let component: EmployeeBonusListComponent;
  let fixture: ComponentFixture<EmployeeBonusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBonusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBonusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
