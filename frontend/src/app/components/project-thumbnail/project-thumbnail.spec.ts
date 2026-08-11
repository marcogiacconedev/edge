import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectThumbnail } from './project-thumbnail';

describe('ProjectThumbnail', () => {
  let component: ProjectThumbnail;
  let fixture: ComponentFixture<ProjectThumbnail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectThumbnail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectThumbnail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
