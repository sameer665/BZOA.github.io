import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimTaskApproverComponent } from './claim-task-approver.component';

describe('ClaimTaskApproverComponent', () => {
  let component: ClaimTaskApproverComponent;
  let fixture: ComponentFixture<ClaimTaskApproverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimTaskApproverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimTaskApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
