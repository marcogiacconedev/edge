import { Photo, Project } from "../model/model";

export const isOnlyNumbers = (input: string): boolean => {
    return /^[0-9]+$/.test(input);
}

export const orderPhotoArray = (photos: Photo[]): Photo[] => {
    return [...photos].sort((a, b) =>
        (a.order ?? Infinity) - (b.order ?? Infinity)
    );
}

export const orderProjectArray = (projects: Project[]): Project[] => {
    return [...projects].sort((a, b) =>
        (a.order ?? Infinity) - (b.order ?? Infinity)
    );
}