import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo, Project } from '../../model/model';
import { FormsModule } from '@angular/forms';
import { emptyProject } from '../../utils/blank-objects';
import { MapService } from '../../services/map-service/map-service';
import { GoToProjects } from "../buttons/go-to-projects/go-to-projects";
import { isOnlyNumbers } from '../../utils/utils';
import { ModalCreation } from '../modal-creation/modal-creation';
import { ProjectService } from '../../services/project-service/project-service';
import { CreateProjectThumbnailResponse, ProjectResponse } from '../../model/dto';
import dotenv from 'dotenv';
dotenv.config();

@Component({
  selector: 'app-reserved-project-form',
  imports: [FormsModule, GoToProjects, ModalCreation],
  templateUrl: './reserved-project-form.html',
  styleUrl: './reserved-project-form.css'
})
export class ReservedProjectForm implements OnInit {

  project: Project = structuredClone(emptyProject);
  projectId!: string | null;
  photos!: Photo[];
  imageToAdd!: File;
  coverImageChanged: boolean = false;
  previewUrlFromProject!: string;
  previewImageFromFiles!: any;
  editMode: boolean = false;
  messageOnSubmit!: string;

  //logica modale
  isSubmitModalOpen: boolean = false;
  isSubmitLoading: boolean = false;
  submitLoadingMessage: string  = '';
  submitResultMessage: string = '';
  submitSuccess: boolean = true;
  submitCompleted: boolean = false;

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {
    const { projectId, editMode } = this.getProjectIdAndModeFromUrl();
    this.projectId = projectId;
    this.editMode = editMode;
  }

  ngOnInit(): void {
    if (this.projectId) {
      this.getProject(this.projectId);  
    } 
  }

  getProjectIdAndModeFromUrl(): { projectId: string, editMode: boolean } {
    const urlSegments = this.router.url.split('/');
    const lastUrlSegment: string | number = urlSegments[urlSegments.length - 1];
    let projectId: string;
    let editMode: boolean = false;

    if (lastUrlSegment === 'new') {
      projectId = "";
    } else {
      projectId = lastUrlSegment
    }

    return { projectId, editMode };
  }

  async getProject(projectId: string): Promise<void> {
    try {
      const response: ProjectResponse = await this.projectService.getProjectById(projectId);
      this.project = new Project(response);
    } catch (error) {
      console.log(error);
    } finally {
      // this.previewUrlFromProject = ; 
    }
  }

  async editProject(): Promise<void> {
    try {
      const response: ProjectResponse = await this.projectService.editProject(this.project);
      if (response.id) {
        this.messageOnSubmit = 'Modifica avvenuta con successo';
      } else {
        this.messageOnSubmit = 'Modifica del progetto non riuscita :(';
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createNewProject(): Promise<void> {
    try {
      const response: ProjectResponse = await this.projectService.createProject(this.project);
      if (response.id) {
        this.messageOnSubmit = 'Creazione progetto andata a buon fine';
      } else {
        this.messageOnSubmit = 'Creazione progetto non riuscita :(';
      }
    } catch (error) {
      console.log(error);
    }
  }

  onImageChange(event: any): void {
    this.imageToAdd = event.target.files[0];
    this.coverImageChanged = true;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImageFromFiles = reader.result;
    };
    reader.readAsDataURL(this.imageToAdd);
  }

  async uploadCoverImage(): Promise<void> {
    if (this.imageToAdd) {
      try {
        const response: CreateProjectThumbnailResponse = await this.projectService.createProjectThumbnail(this.projectId!, this.imageToAdd); 
        this.previewUrlFromProject = `${process.env['API_BASE_URL']}/api/projectthumbnails/${this.projectId}/file`;
      } catch (error) {
        console.log(error);
      }
    }
  }

  isFormComplete(project: any): boolean {
    const requiredFields: string[] = ['title', 'description'];
    let isFormComplete: boolean = true;
    requiredFields.forEach(field => {
      if (!project[`${field}`]) {
        isFormComplete = false;
      }
    });

    return isFormComplete;
  }

  closeSubmitModal(): void {
    this.isSubmitLoading = false;
    this.submitCompleted = true;
    setTimeout(() => {
      this.isSubmitModalOpen = false;
      this.router.navigateByUrl(`/reserved/projects`);
    }, 4000);
  }

  async submit(): Promise<void> {
    this.isSubmitModalOpen = true;
    this.isSubmitLoading = true;
    try {
      if (!this.editMode) {
        this.submitLoadingMessage = 'Creazione in corso';
        await this.createNewProject();
        await this.uploadCoverImage();
        this.submitLoadingMessage = 'Creazione riuscita';
      } else {
        this.submitLoadingMessage = 'Modifica in corsa'
        if (this.coverImageChanged) {          
          await this.uploadCoverImage();
        } 
        await this.editProject();
        this.submitLoadingMessage = 'Modifica riuscita';
      }
    }  catch (error) {
      this.submitLoadingMessage = 'Operazione non riuscita :(';
      this.submitSuccess = false;
      console.log(error);
    } finally {
      this.closeSubmitModal();
    }   
  }

  resourceNotFound(): void {
    
    this.router.navigate(['reserved/not-found'], {
      state: { goBackTo: 'projectForm' }
    });
  }
}
