import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloNegocio } from './modelo-negocio';

describe('ModeloNegocio', () => {
  let component: ModeloNegocio;
  let fixture: ComponentFixture<ModeloNegocio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeloNegocio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeloNegocio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
