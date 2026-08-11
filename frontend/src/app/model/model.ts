// model.ts

export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string; // mai salvare password in chiaro
}

export interface Project {
  id: number;
  userId: number;
  title: string;
  description?: string;
  coverImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  order?: number;
  photos: Photo[]; // relazione uno-a-molti con Photo
  categories?: Category[]; // opzionale
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