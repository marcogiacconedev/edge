import { Component, OnInit } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Supabase } from '../../services/supabase-service/supabase';
import { blankPhoto } from '../../utils/blank-objects';
import { Photo, Project } from '../../model/model';
import { MapService } from '../../services/map-service/map-service';
import { ProjectThumbnail } from '../project-thumbnail/project-thumbnail';
import { orderProjectArray } from '../../utils/utils';

@Component({
  selector: 'app-projects-home',
  imports: [Navbar, Footer, ProjectThumbnail],
  templateUrl: './projects-home.html',
  styleUrl: './projects-home.css'
})
export class ProjectsHome implements OnInit {

  projects!: Project[];

  constructor(
    private supabase: Supabase,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  async getProjects(): Promise<void> {
    try {
      const response = await this.supabase.getProjects();
      this.projects = this.mapService.mapProject(response.data);
      this.projects = orderProjectArray(this.projects);
    } catch (error) {
      console.log(error);
    }
  }
}
