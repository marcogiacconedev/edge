import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supabase } from '../../services/supabase-service/supabase';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Photo, Project } from '../../model/model';
import { MapService } from '../../services/map-service/map-service';
import { PhotoSpotlight } from '../photo-spotlight/photo-spotlight';
import { emptyProject } from '../../utils/blank-objects';
import { orderPhotoArray } from '../../utils/utils';

@Component({
  selector: 'app-project',
  imports: [Navbar, Footer, PhotoSpotlight],
  templateUrl: './projectSpotlight.html',
  styleUrl: './projectSpotlight.css'
})
export class ProjectSpotlight implements OnInit{

  projectId!: number;
  project: Project = structuredClone(emptyProject);
  photos!: Photo[];
  constructor(
    private router: Router,
    private supabase: Supabase,
    private mapSerivice: MapService
  ) {}

  ngOnInit(): void {
    this.getProjectIdFromUrl();
    this.getProject();
    this.getPhotos();
  }
  
  getProjectIdFromUrl(): void {
    const urlSegments = this.router.url.split('/');
    const lastUrlSegment = urlSegments[urlSegments.length - 1];
    this.projectId = parseInt(lastUrlSegment);
  }
  
  async getProject(): Promise<void> {
    try {
      const response = await this.supabase.getProjectById(this.projectId);
      this.project = this.mapSerivice.mapProject(response.data)[0];  
    } catch (error) {
      console.log(error);
    }
  }

  async getPhotos(): Promise<void> {
    try {
      const response = await this.supabase.getPhotosByProjectId(this.projectId);
      this.photos = this.mapSerivice.mapPhoto(response.data);
      this.photos = orderPhotoArray(this.photos);
    } catch (error) {
      console.log(error);
    }
  }
}
