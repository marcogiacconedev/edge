import { Category, Photo, Project } from "../model/model";

export const blankPhoto: Photo = {
    id: '',
    projectId: '',
    title: '',
    description: '',
    takenAt: new Date(),
    updatedAt: new Date(),
    order: 0,
    place: '',
    photoType: ''
};

export const emptyProject: Project = {
    id: "",
    userId: "",
    title: '',
    description: '',
    createdAt: new Date(), // data minima come placeholder
    updatedAt: new Date(),
    order: 0,
};


