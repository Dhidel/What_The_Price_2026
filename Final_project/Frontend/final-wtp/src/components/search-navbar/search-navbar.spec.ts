import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNavbar } from './search-navbar';

describe('SearchNavbar', () => {
  let component: SearchNavbar;
  let fixture: ComponentFixture<SearchNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
