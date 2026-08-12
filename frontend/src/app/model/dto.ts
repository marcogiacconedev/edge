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