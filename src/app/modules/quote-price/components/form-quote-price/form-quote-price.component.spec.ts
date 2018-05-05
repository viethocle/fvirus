import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuotePriceComponent } from './form-quote-price.component';

describe('FormQuotePriceComponent', () => {
  let component: FormQuotePriceComponent;
  let fixture: ComponentFixture<FormQuotePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQuotePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuotePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
