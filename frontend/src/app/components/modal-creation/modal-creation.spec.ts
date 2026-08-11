import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreation } from './modal-creation';

describe('ModalCreation', () => {
  let component: ModalCreation;
  let fixture: ComponentFixture<ModalCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
