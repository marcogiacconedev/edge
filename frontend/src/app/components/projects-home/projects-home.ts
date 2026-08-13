import { Component, OnInit } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Project } from '../../model/model';
import { ProjectThumbnail } from '../project-thumbnail/project-thumbnail';
import { orderProjectArray } from '../../utils/utils';
import { ProjectService } from '../../services/project-service/project-service';
import { ProjectResponse } from '../../model/dto';

@Component({
  selector: 'app-projects-home',
  imports: [Navbar, Footer, ProjectThumbnail],
  templateUrl: './projects-home.html',
  styleUrl: './projects-home.css'
})
export class ProjectsHome implements OnInit {

  projects!: Project[];

  constructor(
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  async getProjects(): Promise<void> {
    try {
      const response: ProjectResponse[] = await this.projectService.getProjects();
      this.projects = response.map(responseProject => {return new Project(responseProject)});
      console.log(this.projects);
    } catch (error) {
      throw error;
    } 
  }
}
