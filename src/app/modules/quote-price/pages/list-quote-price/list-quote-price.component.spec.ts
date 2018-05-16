import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuotePriceComponent } from './list-quote-price.component';

describe('ListQuotePriceComponent', () => {
  let component: ListQuotePriceComponent;
  let fixture: ComponentFixture<ListQuotePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuotePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuotePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
