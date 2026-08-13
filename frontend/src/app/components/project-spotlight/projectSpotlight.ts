import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Photo, Project } from '../../model/model';
import { MapService } from '../../services/map-service/map-service';
import { PhotoSpotlight } from '../photo-spotlight/photo-spotlight';
import { emptyProject } from '../../utils/blank-objects';
import { orderPhotoArray } from '../../utils/utils';
import { ProjectService } from '../../services/project-service/project-service';
import { PhotoService } from '../../services/photo-service/photo-service';
import { PhotoResponse } from '../../model/dto';

@Component({
  selector: 'app-project',
  imports: [Navbar, Footer, PhotoSpotlight],
  templateUrl: './projectSpotlight.html',
  styleUrl: './projectSpotlight.css'
})
export class ProjectSpotlight implements OnInit{

  projectId!: string;
  project: Project = structuredClone(emptyProject);
  photos!: Photo[];
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.getProjectIdFromUrl();
    this.getProject();
    this.getPhotos();
  }
  
  getProjectIdFromUrl(): void {
    const urlSegments = this.router.url.split('/');
    const lastUrlSegment = urlSegments[urlSegments.length - 1];
    this.projectId = lastUrlSegment;
  }
  
  async getProject(): Promise<void> {
    try {
      const response = await this.projectService.getProjectById(this.projectId);
      this.project = new Project(response);  
    } catch (error) {
      console.log(error);
    }
  }

  async getPhotos(): Promise<void> {
    try {
      const response: PhotoResponse[] = await this.photoService.getPhotosByProjectId(this.projectId);
      this.photos = response.map(photoResponse => new Photo(photoResponse));
      this.photos = orderPhotoArray(this.photos);
    } catch (error) {
      console.log(error);
    }
  }
}
