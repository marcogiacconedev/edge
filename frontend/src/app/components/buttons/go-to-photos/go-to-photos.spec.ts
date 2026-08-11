import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToPhotos } from './go-to-photos';

describe('GoToPhotos', () => {
  let component: GoToPhotos;
  let fixture: ComponentFixture<GoToPhotos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoToPhotos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoToPhotos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
