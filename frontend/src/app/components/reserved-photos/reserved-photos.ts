import { Component, OnInit } from '@angular/core';
import { Photo } from '../../model/model';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MapService } from '../../services/map-service/map-service';
import { GoToProjects } from "../buttons/go-to-projects/go-to-projects";
import { ModalWarning } from "../modal-warning/modal-warning";
import { blankPhoto } from '../../utils/blank-objects';
import { PhotoService } from '../../services/photo-service/photo-service';
import { ProjectService } from '../../services/project-service/project-service';
import { PhotoResponse } from '../../model/dto';

@Component({
  selector: 'app-reserved-photos',
  imports: [DatePipe, FormsModule, GoToProjects, ModalWarning, NgClass],
  templateUrl: './reserved-photos.html',
  styleUrl: './reserved-photos.css'
})
export class ReservedPhotos implements OnInit{

  photos: Photo[] = [];
  isPhotosLoading: boolean = true;
  projectId!: string;
  photoToDelete: Photo = structuredClone(blankPhoto);
  deletePhotoMessage!: string;
  isModalOpen: boolean = false;
  isDeletionLoading: boolean = false;
  deletionLoadingCompleted: boolean = false;
  deletionSuccessful: boolean = true;

  constructor(
    private photoService: PhotoService,
    private projectService: ProjectService,
    private router: Router
  ) { }  

  ngOnInit(): void {
    this.projectId = this.getProjectIdFromUrl();
    this.getProject(this.projectId);
    this.getProjectPhotos(this.projectId);
  }

  getProjectIdFromUrl(): string {
    //estrae l' id del progetto a partire dall' url
    const urlSegments: string[] = this.router.url.split('/');
    const lastUrlSegment: string = urlSegments[urlSegments.length - 2];
    let projectId: string = lastUrlSegment;
    return projectId
  }

  async getProject(projectId: string): Promise<void> {
    try {
      const response = await this.projectService.getProjectById(projectId);
      if (!response.id) {
        this.resourceNotFound();
        return
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProjectPhotos(projectId: string): Promise<void> {
    try {
      this.isPhotosLoading = true;
      const response: PhotoResponse[] = await this.photoService.getPhotosByProjectId(projectId);
      if (response.length) {
        this.photos = response.map(photo => new Photo(photo));
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.isPhotosLoading = false;
    }
  }

  editPhoto(photo: Photo): void {
    console.log(this.projectId, photo.id)
    this.router.navigateByUrl(`/reserved/projects/${this.projectId}/photos/${photo.id}`)
  }

  addNewPhoto(): void {
    this.router.navigateByUrl(`reserved/projects/${this.projectId}/photos/new`);
  }

  openWarningModal(photo: Photo): void {
    this.photoToDelete = photo;
    this.isModalOpen = true;
  }

  closeWarningModal(): void {
    this.isDeletionLoading = false;
    this.deletionLoadingCompleted = true;
    this.getProjectPhotos(this.projectId);
    setTimeout(() => {
      this.deletionLoadingCompleted = false;
      this.isModalOpen = false;
    }, 2000)
  }

  receiveModalAction(action: boolean): void {
    if (action) {
      this.deletePhoto(this.photoToDelete);
    } else {
      this.isModalOpen = false;
    }
  }

  async deletePhoto(photo: Photo): Promise<void> {
    //cancellazione logica dei metadati
    try {
      this.isDeletionLoading = true;
      const response = await this.photoService.deletePhoto(photo.id);
      console.log(response);
      // if (response) {
      //   this.deletePhotoMessage = 'Eliminazione avventua con successo!';
      // } else {
      //   this.deletePhotoMessage = 'Eliminazione non riuscita :(';
      //   return
      // }
    } catch (error) {
      console.log(error);
    } finally {
      this.closeWarningModal();
    }
  }

  resourceNotFound(): void {
    this.router.navigateByUrl('reserved/not-found');
  }
}
