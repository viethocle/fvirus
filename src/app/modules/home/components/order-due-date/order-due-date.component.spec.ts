import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDueDateComponent } from './order-due-date.component';

describe('OrderDueDateComponent', () => {
  let component: OrderDueDateComponent;
  let fixture: ComponentFixture<OrderDueDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDueDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDueDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
