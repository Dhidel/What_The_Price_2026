import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Escalabilidad } from './escalabilidad';

describe('Escalabilidad', () => {
  let component: Escalabilidad;
  let fixture: ComponentFixture<Escalabilidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Escalabilidad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Escalabilidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
