import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo, Project } from '../../model/model';
import { FormsModule } from '@angular/forms';
import { emptyProject } from '../../utils/blank-objects';
import { GoToProjects } from "../buttons/go-to-projects/go-to-projects";
import { ModalCreation } from '../modal-creation/modal-creation';
import { ProjectService } from '../../services/project-service/project-service';
import { CreateProjectThumbnailResponse, ProjectResponse } from '../../model/dto';
import { environment } from '../../../environments/environment.development';

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
    let editMode: boolean = true;

    if (lastUrlSegment === 'new') {
      projectId = "";
      editMode = false;
    } else {
      projectId = lastUrlSegment
    }
    return { projectId, editMode };
  }

  async getProject(projectId: string): Promise<void> {
    try {
      const projectResponse: ProjectResponse = await this.projectService.getProjectById(projectId);
      this.project = new Project(projectResponse);
      this.imageToAdd = await this.getPhotoAsFile(projectId, `${projectId}-thumbnail`);
    } catch (error) {
      console.log(error);
    } finally {
      this.previewUrlFromProject = `${environment.API_BASE_URL}/api/projectthumbnails/${this.project.id}/file`; 
    }
  }

  async getPhotoAsFile(projectId: string, filename: string): Promise<File> {
    const response = await fetch(`${environment.API_BASE_URL}/api/projectthumbnails/${projectId}/file`);

    if (!response.ok) throw new Error('Unable to fetch the photo file');

    const blob = await response.blob();

    return new File([blob], filename, {
      type: blob.type,
      lastModified: Date.now()
    });
  }
  
  async editProject(): Promise<void> {
    try {
      const projectResponse: ProjectResponse = await this.projectService.editProject(this.project);
      this.project = new Project(projectResponse);
      const thumbnailResponse = await this.projectService.updateProjectThumbnail(this.project.id, this.imageToAdd);
      if (projectResponse.id) {
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
      const projectResponse: ProjectResponse = await this.projectService.createProject(this.project);
      this.project = new Project(projectResponse);
      const thumbnailResponse: CreateProjectThumbnailResponse = await this.projectService.createProjectThumbnail(this.project.id, this.imageToAdd)
      if (projectResponse.id) {
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
        this.previewUrlFromProject = `${environment['API_BASE_URL']}/api/projectthumbnails/${this.projectId}/file`;
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
    console.log(this.editMode);
    this.isSubmitModalOpen = true;
    this.isSubmitLoading = true;
    try {
      if (!this.editMode) {
        this.submitLoadingMessage = 'Creazione in corso';
        await this.createNewProject();
        this.submitLoadingMessage = 'Creazione riuscita';
      } else {
        this.submitLoadingMessage = 'Modifica in corso'
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
