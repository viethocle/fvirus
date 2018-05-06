import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateQuotePriceComponent } from './template-quote-price.component';

describe('TemplateQuotePriceComponent', () => {
  let component: TemplateQuotePriceComponent;
  let fixture: ComponentFixture<TemplateQuotePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateQuotePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateQuotePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
