// model.ts

import { ProjectResponse } from "./dto";

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

export interface Photo {
  id: number;
  projectId: number; // relazione con Project
  title?: string;
  description?: string;
  imageUrl: string;
  takenAt?: string;
  place?: string;
  order?: number; // per ordinare le foto nel progetto
  photoType?: string; // potenzialmente, per cambiare la visualizzazione di alcune foto
                      // quando le si guardano all' interno di un progetto (NON ANCORA IMPLEMENTATA)
  deleted: boolean
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}