import { Component, OnInit } from '@angular/core';
import { blankPhoto } from '../../utils/blank-objects';
import { Photo } from '../../model/model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MapService } from '../../services/map-service/map-service';
import { GoToPhotos } from "../buttons/go-to-photos/go-to-photos";
import { isOnlyNumbers } from '../../utils/utils';
import { ModalCreation } from '../modal-creation/modal-creation';
import { AuthService } from '../../services/auth-service/auth-service';
import { PhotoService } from '../../services/photo-service/photo-service';
import { PhotoResponse } from '../../model/dto';
import dotenv from 'dotenv';
dotenv.config();

@Component({
  selector: 'app-reserved-photo-form',
  imports: [FormsModule, GoToPhotos, ModalCreation],
  templateUrl: './reserved-photo-form.html',
  styleUrl: './reserved-photo-form.css',
})
export class ReservedPhotoForm implements OnInit {

  photo: Photo = structuredClone(blankPhoto);
  imageToAdd!: File;
  projectId!: string;
  photoId!: string;
  editMode: boolean = false;
  photoImageChanged: boolean = false;
  previewUrlFromPhoto!: string;
  previewImageFromFiles!: any;

  //logica modale
  isSubmitModalOpen: boolean = false;
  isSubmitLoading: boolean = false;
  submitLoadingMessage: string  = '';
  submitResultMessage: string = '';
  submitSuccess: boolean = true;
  submitCompleted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private photoService: PhotoService,
    private mapService: MapService
  ) {
    this.photo = structuredClone(blankPhoto);
    this.photo.projectId = this.getProjectIdFromUrl();
    const { photoId , editMode } = this.getPhotoIdAndModeFromUrl();
    this.photoId = photoId;
    this.editMode = editMode;
  }

  ngOnInit(): void {
    if (this.photoId) {
      this.getPhoto(this.photoId);
    }
  }

  getPhotoIdAndModeFromUrl(): {
    photoId: string,
    editMode: boolean
  } {
    const urlSegments: string[] = this.router.url.split('/');
    const lastUrlSegment: string = urlSegments[urlSegments.length - 1];
    let photoId: string;
    let editMode: boolean = false;

    if (lastUrlSegment === 'new') {
      photoId = "";
    } else {
      editMode = true;
      photoId = lastUrlSegment;
    } 

    return { photoId, editMode }
  }

  getProjectIdFromUrl(): string {
    //estrae l' id del progetto a partire dall' url
    const urlSegments: string[] = this.router.url.split('/');
    const projectUrlSegment: string = urlSegments[urlSegments.length - 3];
    let projectId: string = projectUrlSegment;
    return projectId
  }

  // async getNewId(): Promise<void> {
  //   const newId: number = await this.photoService.getNewPhotoId();
  //   if (newId !== 0) {
  //     this.photo.id = newId;
  //   }
  // }

  async getPhoto(photoId: string): Promise<void> {

    try {
      const response: PhotoResponse = await this.photoService.getPhotoById(photoId);
      if (response.id) {
        this.photo = new Photo(response);
        if (this.photo && this.photo.takenAt) {   //formatta la data in modo compatibile con il date picker del browser
          // this.photo.takenAt = new Date(this.photo.takenAt).toISOString().split('T')[0];
        }
      } else {
        this.resourceNotFound();
        return
      }

      //controlla che la foto appartenga al progetto
      if (this.projectId !== this.photo.projectId) {
        this.resourceNotFound();
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.previewUrlFromPhoto = `${process.env['BASE_API_URL']}/api/photos/${this.photo.id}/file`;
    }
  }

  onImageChange(event: any): void {
    this.imageToAdd = event.target.files[0];
    this.photoImageChanged = true;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImageFromFiles = reader.result;
    };
    reader.readAsDataURL(this.imageToAdd);
  }

  isFormComplete(photoToAdd: any): boolean {
    const requiredFields: string[] = ['title', 'takenAt', 'order'];
    let isFormComplete: boolean = true;
    requiredFields.forEach(field => {
      if (!photoToAdd[`${field}`]) {
        isFormComplete = false;
      }
    });

    return isFormComplete;
  }

  async createNewPhoto(): Promise<void> {
    await this.photoService.createPhoto(this.photo, this.photo.projectId, this.imageToAdd);
  }

  async editPhoto(): Promise<void> {
    try {
      const response = await this.photoService.updatePhoto(this.photo, this.imageToAdd);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  closeSubmitModal(): void {
    this.isSubmitLoading = false;
    this.submitCompleted = true;
    setTimeout(() => {
      this.isSubmitModalOpen = false;
      this.router.navigateByUrl(`/reserved/projects/${this.photo.projectId}/photos`);
    }, 4000);
  }
  
  async submit(): Promise<void> {
    this.isSubmitModalOpen = true;
    this.isSubmitLoading = true;
    try {
      if (!this.editMode) {
        this.submitLoadingMessage = 'Creazione in corso';
        // await this.uploadPhotoImage();
        await this.createNewPhoto();
        this.submitLoadingMessage = 'Creazione riuscita!';
      } else {
        this.submitLoadingMessage = 'Modifica in corso';
        if (this.photoImageChanged) {
          // await this.uploadPhotoImage();
        }
        await this.editPhoto();
        this.submitLoadingMessage = 'Modifica riuscita!'
      }
    } catch (error) {
      this.submitLoadingMessage = 'Operazione non riuscita :(';
      this.submitSuccess = false;
      console.log(error);
    } finally {
      this.closeSubmitModal();
    }
  }

  resourceNotFound(): void {
    this.router.navigate(['reserved/not-found'], {
      state: { goBackTo: 'photoForm' }
    });
  }
}
