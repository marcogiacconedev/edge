import { inject, Injectable } from '@angular/core';
import { Project } from '../../model/model';
import dotenv from 'dotenv';
import { AuthService } from '../auth-service/auth-service';
import { ProjectResponse } from '../../model/dto';
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

      if (!response.ok) {
        throw new Error('Unable to get projects');
      }

      const data = await response.json();

      return data;

    } catch (error) {
      throw error;
    }
  }

  public async deleteProject(projectId: string): Promise<void> {
    try {
      const response = await fetch(`${process.env['API_BASE_URL']}/api/projects${projectId}`, {
        headers: {
          "Authorization" : `Bearer ${this.token}`
        }        
      })

      if (!response.ok) {
        throw new Error('Unable to get the projects');
      }
    } catch (error) {
      throw error;
    }
  }

}
