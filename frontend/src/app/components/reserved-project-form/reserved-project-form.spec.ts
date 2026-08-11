import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedProjectForm } from './reserved-project-form';

describe('ReservedProjectForm', () => {
  let component: ReservedProjectForm;
  let fixture: ComponentFixture<ReservedProjectForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservedProjectForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedProjectForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
