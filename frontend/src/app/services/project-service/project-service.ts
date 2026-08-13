import { inject, Injectable } from '@angular/core';
import { Project } from '../../model/model';
import dotenv from 'dotenv';
import { AuthService } from '../auth-service/auth-service';
import { CreateProjectRequest, CreateProjectThumbnailResponse, ProjectResponse, UpdateProjectRequest } from '../../model/dto';
dotenv.config();

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  authService = inject(AuthService);
  private token: string | null = this.authService.getToken();

  public async getProjects(): Promise<ProjectResponse[]> {
    try {
      const response = await fetch(`${process.env['API_BASE_URL']}/api/projects`,{
        headers: {
          "Authorization" : `Bearer ${this.token}`
        }
      })

      if (!response.ok) throw new Error('Unable to get projects');

      const data = await response.json();
      return data;

    } catch (error) {
      throw error;
    }
  }

  public async getProjectById(projectId: string): Promise<ProjectResponse> {
    try {
      const response = await fetch(`${process.env['API_BASE_URL']}/api/projects/${projectId}`);

      if (!response.ok) throw new Error('Unable to fetch the project');      

      const data: ProjectResponse = await response.json();
      return data;
      
    } catch (error) {
      throw error;
    }
  }

  public async createProject(project: Project): Promise<ProjectResponse> {
    const requestBody = new CreateProjectRequest(project);

    try {
      const response = await fetch(`${process.env['API_BASE_URL']}/api/projects`, {
        method: 'POST',
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('edgeJwt')}`,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(requestBody)
      })
      if (!response.ok) throw new Error('Unable to create project');

      const data: ProjectResponse = await response.json();
      return data;

    } catch (error) {
      throw error;
    }
  }

  public async editProject(project: Project): Promise<ProjectResponse> {
    const body = new UpdateProjectRequest(project);
    try {
      const response = await fetch(`${process.env['API_BASE_URL']}/api/projects`, {
        method: 'PUT',
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('edgeJwt')}`,
          "Content-Type" : "application/json"        
        },
        body: JSON.stringify(body)
      })
      if (!response.ok) throw new Error('Unable to update project');

      const data = await response.json();
      return data;

    } catch (error) {
      throw error;
    }
  }

  public async deleteProject(projectId: string): Promise<void> {
    try {
      const response = await fetch(`${process.env['API_BASE_URL']}/api/projects/${projectId}`, {
        headers: {
          "Authorization" : `Bearer ${this.token}`
        }        
      })

      if (!response.ok) throw new Error('Unable to get the projects');
      
    } catch (error) {
      throw error;
    }
  }

  public async createProjectThumbnail(projectId: string, image: File): Promise<CreateProjectThumbnailResponse> {
    const formData = new FormData();
    formData.append('file', image);
    try {
      const response = await fetch(`${process.env['API_BASE_URL']}/api/projectthumbnails/${projectId}`, {
        method: 'POST',
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('edgeJwt')}`          
        },
        body: formData
      })

      if (!response.ok) throw new Error('Unable to upload cover image');

      const data: CreateProjectThumbnailResponse = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

}
