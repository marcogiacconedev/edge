import { Component, OnInit } from '@angular/core';
import { Photo } from '../../model/model';
import { Supabase } from '../../services/supabase-service/supabase';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MapService } from '../../services/map-service/map-service';
import { GoToProjects } from "../buttons/go-to-projects/go-to-projects";
import { ModalWarning } from "../modal-warning/modal-warning";
import { blankPhoto } from '../../utils/blank-objects';

@Component({
  selector: 'app-reserved-photos',
  imports: [DatePipe, FormsModule, GoToProjects, ModalWarning, NgClass],
  templateUrl: './reserved-photos.html',
  styleUrl: './reserved-photos.css'
})
export class ReservedPhotos implements OnInit{

  photos: Photo[] = [];
  isPhotosLoading: boolean = true;
  projectId!: number;
  photoToDelete: Photo = structuredClone(blankPhoto);
  deletePhotoMessage!: string;
  isModalOpen: boolean = false;
  isDeletionLoading: boolean = false;
  deletionLoadingCompleted: boolean = false;
  deletionSuccessful: boolean = true;

  constructor(
    private supabase: Supabase,
    private router: Router,
    private mapService: MapService
  ) { }  

  ngOnInit(): void {
    this.projectId = this.getProjectIdFromUrl();
    this.getProject(this.projectId);
    this.getProjectPhotos(this.projectId);
  }

  getProjectIdFromUrl(): number {
    //estrae l' id del progetto a partire dall' url
    const urlSegments: string[] = this.router.url.split('/');
    const lastUrlSegment: string | number = urlSegments[urlSegments.length - 2];
    let projectId: number | null;
    projectId = parseInt(lastUrlSegment);
    return projectId
  }

  async getProject(projectId: number): Promise<void> {
    try {
      const response = await this.supabase.getProjectById(projectId);
      console.log(response);
      if (response.data && response.data.length < 1) {
        this.resourceNotFound();
        return
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProjectPhotos(projectId: number): Promise<void> {
    try {
      this.isPhotosLoading = true;
      const response = await this.supabase.getPhotosByProjectId(projectId);
      if (response.status === 200) {
        this.photos = this.mapService.mapPhoto(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.isPhotosLoading = false;
    }
  }

  editPhoto(photo: Photo): void {
    this.router.navigateByUrl(`/reserved/projects/${this.projectId}/photos/${photo.id}`)
  }

  addNewPhoto(): void {
    this.router.navigateByUrl(`reserved/projects/${this.projectId}/photos/create`);
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
      const response = await this.supabase.deletePhoto(photo.id);
      console.log(response);
      if (response.status === 200) {
        this.deletePhotoMessage = 'Eliminazione avventua con successo!';
      } else {
        this.deletePhotoMessage = 'Eliminazione non riuscita :(';
        return
      }
      //cancellazione dell' immagine dallo storage
      await this.supabase.deleteImage(photo.imageUrl);
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
