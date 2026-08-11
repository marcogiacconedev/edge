import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedPhotoForm } from './reserved-photo-form';

describe('ReservedPhotoForm', () => {
  let component: ReservedPhotoForm;
  let fixture: ComponentFixture<ReservedPhotoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservedPhotoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedPhotoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
