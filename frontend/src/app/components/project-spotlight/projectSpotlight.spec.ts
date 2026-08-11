import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSpotlight } from './projectSpotlight';

describe('ProjectSpotlight', () => {
  let component: ProjectSpotlight;
  let fixture: ComponentFixture<ProjectSpotlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSpotlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSpotlight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
