import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSpotlight } from './photo-spotlight';

describe('PhotoSpotlight', () => {
  let component: PhotoSpotlight;
  let fixture: ComponentFixture<PhotoSpotlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoSpotlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoSpotlight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
