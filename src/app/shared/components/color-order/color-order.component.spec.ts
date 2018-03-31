import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorOrderComponent } from './color-order.component';

describe('ColorOrderComponent', () => {
  let component: ColorOrderComponent;
  let fixture: ComponentFixture<ColorOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
