import { Photo, Project } from "./model";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface ProjectResponse {
    createdAt: string;
    description: string;
    id: string;
    order: number;
    title: string;
    updatedAt: string;
    userId: string;
}

export interface PhotoResponse {
    id: string;
    projectId: string;
    title: string;
    description: string;
    takenAt: string;
    updatedAt: string;
    place: string;
    order: number;
    photoType: string;
}

export class CreateProjectRequest {
    title: string;
    description: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(project: Project) {
        this.title = project.title;
        this.description = project.description;
        this.order = project.order;
        this.createdAt = project.createdAt;
        this.updatedAt = project.updatedAt;
    }
}

export class UpdateProjectRequest {
    title: string;
    description: string;
    order: number;

    constructor(project: Project) {
        this.title = project.title;
        this.description = project.description;
        this.order = project.order
    }
}

export class CreatePhotoRequest {
    title: string;
    description: string;
    order: number;
    takenAt: Date;
    place: string;

    constructor (photo: Photo) {
        this.title = photo.title;
        this.description = photo.description;
        this.order = photo.order;
        this.takenAt = photo.takenAt;
        this.place = photo.place;
    }
}

export class UpdatePhotoRequest {
    title: string;
    description: string;
    order: number;
    takenAt: Date;
    place: string;

    constructor (photo: Photo) {
        this.title = photo.title;
        this.description = photo.description;
        this.order = photo.order;
        this.takenAt = photo.takenAt;
        this.place = photo.place;
    }
}

export interface CreateProjectThumbnailResponse{
    id: string;
    photoType: string;
    projectId: string;
}