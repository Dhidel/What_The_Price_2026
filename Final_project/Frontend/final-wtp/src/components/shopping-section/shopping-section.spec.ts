import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingSection } from './shopping-section';

describe('ShoppingSection', () => {
  let component: ShoppingSection;
  let fixture: ComponentFixture<ShoppingSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
