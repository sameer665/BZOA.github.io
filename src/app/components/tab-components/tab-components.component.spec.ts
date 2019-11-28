import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponentsComponent } from './tab-components.component';

describe('TabComponentsComponent', () => {
  let component: TabComponentsComponent;
  let fixture: ComponentFixture<TabComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
