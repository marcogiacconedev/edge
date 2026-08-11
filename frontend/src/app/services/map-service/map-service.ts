import { Injectable } from '@angular/core';
import { Category, Photo, Project } from '../../model/model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapProject(apiData: any): Project[] {
    const mappedProjects: Project[] = apiData.map((project: any) => {
      return {
        id: project.id,
        userId: project.user_id, // il tuo modello vuole string
        title: project.title,
        description: project.description,
        coverImageUrl: project.cover_image_url,
        order: project.order,
        createdAt: new Date(project.created_at),
        updatedAt: new Date(project.updated_at),
        photos: [], // da popolare se ci sono relazioni
        categories: [], // opzionale
      };
    })
    return mappedProjects;
  }

  mapPhoto(apiData: any): Photo[] {
    const mappedPhotos: Photo[] = apiData.map((photo: any) => {
      return {
        id: photo.id,
        projectId: photo.project_id,
        title: photo.title,
        description: photo.description,
        imageUrl: photo.image_url,
        takenAt: photo.taken_at ? new Date(photo.taken_at) : undefined,
        order: photo.order,
        createdAt: new Date(photo.created_at),
        updatedAt: new Date(photo.updated_at),
        deleted: photo.deleted
      };
    })
    return mappedPhotos;
  }

  mapCategory(apiData: any): Category {
    return {
      id: apiData.id,
      name: apiData.name,
      description: apiData.description,
    };
  }


  
}
