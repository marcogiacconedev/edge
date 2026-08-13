import { Category, Photo, Project } from "../model/model";

export const blankPhoto: Photo = {
    id: '',
    projectId: '',
    title: '',
    description: '',
    takenAt: new Date(0),
    updatedAt: new Date(0),
    order: 0,
    place: '',
    photoType: ''
};

export const emptyProject: Project = {
    id: "",
    userId: "",
    title: '',
    description: '',
    createdAt: new Date(0), // data minima come placeholder
    updatedAt: new Date(0),
    order: 0,
};


