import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedProjects } from './reserved-projects';

describe('ReservedProjects', () => {
  let component: ReservedProjects;
  let fixture: ComponentFixture<ReservedProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservedProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
