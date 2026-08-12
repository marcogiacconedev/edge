// model.ts

import { PhotoResponse, ProjectResponse } from "./dto";

export interface User {
  id: number;
  name: string;
  email: string;
}

export class Project {
  createdAt: Date;
  description: string;
  id: string;
  order: number;
  title: string;
  updatedAt: Date;
  userId: string;

  constructor(projectResponse: ProjectResponse) {
    this.createdAt = new Date(projectResponse.createdAt);
    this.description = projectResponse.description;
    this.id = projectResponse.id;
    this.order = projectResponse.order;
    this.title = projectResponse.title;
    this.updatedAt = new Date(projectResponse.updatedAt);
    this.userId = projectResponse.userId;
  }
}

export class Photo {
  id: string;
  projectId: string;
  title: string;
  description: string;
  takenAt: Date;
  updatedAt: Date;
  place: string;
  order: number;
  photoType: string;

  constructor(photoResponse: PhotoResponse) {
    this.id = photoResponse.id;
    this.projectId = photoResponse.projectId;
    this.title = photoResponse.title;
    this.description = photoResponse.description;
    this.takenAt = new Date(photoResponse.takenAt);
    this.updatedAt = new Date(photoResponse.updatedAt);
    this.place = photoResponse.place;
    this.order = photoResponse.order;
    this.photoType = photoResponse.photoType;
  }
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}