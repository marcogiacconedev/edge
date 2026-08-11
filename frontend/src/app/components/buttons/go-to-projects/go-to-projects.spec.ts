import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToProjects } from './go-to-projects';

describe('GoToProjects', () => {
  let component: GoToProjects;
  let fixture: ComponentFixture<GoToProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoToProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoToProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
