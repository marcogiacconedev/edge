import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedPhotos } from './reserved-photos';

describe('ReservedPhotos', () => {
  let component: ReservedPhotos;
  let fixture: ComponentFixture<ReservedPhotos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservedPhotos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedPhotos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
