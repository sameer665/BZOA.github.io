import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiProcessComponent } from './activiti-process.component';

describe('ActivitiProcessComponent', () => {
  let component: ActivitiProcessComponent;
  let fixture: ComponentFixture<ActivitiProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
