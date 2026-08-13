import { inject, Injectable } from '@angular/core';
import { CreatePhotoRequest, PhotoResponse, UpdatePhotoRequest } from '../../model/dto';
import { AuthService } from '../auth-service/auth-service';
import { Photo } from '../../model/model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  authService = inject(AuthService);

  public async createPhoto(photo: Photo, projectId: string, file: File): Promise<PhotoResponse> {
    const formData = new FormData();
    const jsonBlob = new Blob(
      [JSON.stringify(new CreatePhotoRequest(photo))],
      { type: 'application/json' }
    );
    formData.append('data', jsonBlob);
    formData.append('file', file);

    try {
      const response = await fetch(`${environment['API_BASE_URL']}/api/projects/${projectId}/photos`, {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${this.authService.getToken()}`
        },
        body: formData
      })

      if (!response.ok) throw new Error('Unable to create new photo');

      const data: PhotoResponse = await response.json();
      return data;

    } catch (error) {
      throw error;
    }
  }

  public async getPhotoById(photoId: string): Promise<PhotoResponse> {
    try {
      const response = await fetch(`${environment['API_BASE_URL']}/api/photos/${photoId}`, {
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${this.authService.getToken()}`
        }
      })

      if (!response.ok) throw new Error('Unable to fetch the photo');

      const data: PhotoResponse = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getPhotosByProjectId(projectId: string): Promise<PhotoResponse[]> {
    try {
      const response = await fetch(`${environment['API_BASE_URL']}/api/projects/${projectId}/photos`);
      if (!response.ok) throw new Error('Unable to fetch the photos');

      const data: PhotoResponse[] = await response.json();
      return data;
      
    } catch (error) {
      throw error;
    }
  }

  public async updatePhoto(photo: Photo, file: File): Promise<PhotoResponse> {
    const formData = new FormData();
    const jsonBlob = new Blob(
      [JSON.stringify(new UpdatePhotoRequest(photo))],
      { type: 'application/json' }
    );
    formData.append('data', jsonBlob);
    formData.append('file', file);

    try {
      const response = await fetch(`${environment['API_BASE_URL']}/api/photos/${photo.id}`, {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${this.authService.getToken()}`
        },
        body: formData
      })

      if (!response.ok) throw new Error('Unable to create new photo');

      const data: PhotoResponse = await response.json();
      return data;

    } catch (error) {
      throw error;
    }    
  }

  public async deletePhoto(photoId: string): Promise<void> {
    try {
      const response = await fetch(`${environment['API_BASE_URL']}/api/photos/${photoId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${this.authService.getToken()}`
        }
      })

      if (!response.ok) throw new Error('Unable to delete the project');

    } catch (error) {
      throw error;
    }
  }
}
