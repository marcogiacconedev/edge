import { Injectable } from '@angular/core';
import { createClient, PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../../environments/environment';
import { Photo, Project } from '../../model/model';
import { MapService } from '../map-service/map-service';

@Injectable({
  providedIn: 'root'
})
export class Supabase {

  supabase!: SupabaseClient;

  constructor(
    private mapService: MapService
  ) {
    const supabaseUrl = environment.supabaseUrl;
    const supabaseKey = environment.supabaseKey;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  //client
  get client(): SupabaseClient {
    return this.supabase;
  }

  //projects
  async getProjects(): Promise<any> {
    return this.supabase
      .from('projects')
      .select('*', { count: 'exact' })
      .eq('deleted', false);
  }

  async getNewProjectId(): Promise<number> {
    let newId: number = 0;
    try {
      const response = await this.supabase
        .from('projects')
        .select('*', { count: 'exact' })
      if (response.status === 200 && response.count) {
        newId = response.count + 1;
      } 
    } catch (error) {
      console.log(error);
    }

    return newId;
  }

  async getProjectById(projectId: number): Promise<any> {
    return this.supabase
      .from('projects')
      .select('*')
      .eq('id', `${projectId}`)
      .eq('deleted', false)
  }

  async getPhotosByProjectId(projectId: number): Promise<any> {
    return this.supabase
      .from('photos')
      .select('*')
      .eq('project_id', `${projectId}`)
      .eq('deleted', false);
  }

  async createNewProject(project: Project): Promise<any> {
    return this.supabase
      .from('projects')
      .insert([
        {
          id: project.id,
          title: project.title,
          description: project.description,
          user_id: 10,
          cover_image_url: project.coverImageUrl,
          order: project.order,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          place: 'Butty'
        }
      ])
      .select();
  }

  async deleteProject(projectId: number): Promise<any> {
    return this.supabase  
      .from('projects')
      .update({ deleted: true })
      .eq('id', `${projectId}`)
      .select()  
  }

  async editProject(project: Project): Promise<any> {
    return this.supabase
      .from('projects')
      .update({ 
        updated_at: new Date().toISOString(),
        title: project.title,
        description: project.description,
        cover_image_url: project.coverImageUrl,
        order: project.order
      })
      .eq('id', `${project.id}`)
      .select()
  }

  //images - photos
  async createImage(file: File): Promise<string> {
    const filePath = `${Date.now()}_${file.name}`;

    await this.supabase.storage
      .from('image-storage')
      .upload(filePath, file);

    return filePath
  }

  getImagePublicUrl(filePath: string): string {
    let publicUrl: string = '';
    const response = this.supabase.storage
      .from('image-storage')
      .getPublicUrl(filePath);
    publicUrl = response.data.publicUrl
    
    return publicUrl;
  }

  async deleteImage(filepath: string): Promise<void> {
    const response = await this.supabase.storage
      .from('image-storage')
      .remove([filepath])
  }

  async deleteImageBulk(filepaths: string[]) {
    const response = await this.supabase.storage
      .from('image-storage')
      .remove(filepaths)

    console.log(response);
  }

  async deleteProjectImages(projectId: number): Promise<void> {
    let projectPhotos: Photo[] = [];
    let projectPhotosFilepaths: string[] = [];
    try {
      //chiamo tutte le foto del progetto
      const response = await this.getPhotosByProjectId(projectId);
      projectPhotos = this.mapService.mapPhoto(response.data);
      //creo un array di tutti i filepaths
      projectPhotosFilepaths = projectPhotos.map(photo => { return photo.imageUrl });
      //se l' array ha elementi dentro, faccio una eliminazione in blocco dallo storage
      if (projectPhotosFilepaths.length > 0) await this.deleteImageBulk(projectPhotosFilepaths);    
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProjectPhotos(projectId: number): Promise<any> {
    return this.supabase
      .from('photos')
      .update({ deleted: true })
      .eq('project_id', projectId);
  }

  async getNewPhotoId(): Promise<number> {
    console.log('getting a new id');
    let newId: number | null = 0;
    try {
      const response = await this.supabase
        .from('photos')
        .select('*', { count: 'exact' })
      if (response.status === 200 && response.count) {
        console.log('qui')
        newId = response.count + 1;
      }
      console.log(response.status, response.count);
    } catch (error) {
      console.log(error);
    }
    console.log(newId);
    return newId;
  }

  async createNewPhoto(photo: Photo, projectId: number): Promise<any> {
    const now = new Date().toISOString();
    console.log(photo, projectId);
    return this.supabase
      .from('photos')
      .insert([
        {
          id: photo.id,
          project_id: projectId,
          title: photo.title,
          description: photo.description,
          image_url: photo.imageUrl,
          taken_at: photo.takenAt,
          order: photo.order,
          created_at: now,
          updated_at: now
        }
      ])
      .select();
  }

  async getPhotoById(photoId: number): Promise<any> {
    return this.supabase 
      .from('photos')
      .select('*')
      .eq('id', `${photoId}`)
      .eq('deleted', false)
  }

  async deletePhoto(photoId: number): Promise<any> {
    return this.supabase
      .from('photos')
      .update({ deleted: true })
      .eq('id', `${photoId}`)
      .select()
  }

  async editPhoto(photo: Photo): Promise<any> {
    return this.supabase
      .from('photos')
      .update({
        updated_at: new Date().toISOString(),
        title: photo.title,
        description: photo.description,
        order: photo.order,
        image_url: photo.imageUrl,
        taken_at: photo.takenAt   
      })
      .eq('id', `${photo.id}`)
      .select()
  }

  //autenticazione
  private async getUser(email:string, password: string ): Promise<PostgrestSingleResponse<any>> {
    const response: PostgrestSingleResponse<any[]> = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)

    return response;
  }

  async signIn(email: string, password: string): Promise<any> {
    let token: string = 'jdsa88sdja89123';
    const response: PostgrestSingleResponse<any[]> = await this.getUser(email, password);

    if (response.data && response.data[0]) {
      sessionStorage.setItem('emma_reserved_token', token);
    }    

    return this.isUserLoggedIn();
  }

  signOut(): void {
    sessionStorage.setItem('emma_reserved_token', '');
  }

  isUserLoggedIn(): boolean {
    if (sessionStorage.getItem('emma_reserved_token')) {
      return true;
    } else {
      return false;
    }
  }
}