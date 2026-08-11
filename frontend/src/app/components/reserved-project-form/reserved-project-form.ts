import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo, Project } from '../../model/model';
import { FormsModule } from '@angular/forms';
import { Supabase } from '../../services/supabase-service/supabase';
import { emptyProject } from '../../utils/blank-objects';
import { MapService } from '../../services/map-service/map-service';
import { GoToProjects } from "../buttons/go-to-projects/go-to-projects";
import { isOnlyNumbers } from '../../utils/utils';
import { ModalCreation } from '../modal-creation/modal-creation';

@Component({
  selector: 'app-reserved-project-form',
  imports: [FormsModule, GoToProjects, ModalCreation],
  templateUrl: './reserved-project-form.html',
  styleUrl: './reserved-project-form.css'
})
export class ReservedProjectForm implements OnInit {

  project: Project = structuredClone(emptyProject);
  projectId!: number | null;
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
    private supabase: Supabase,
    private mapService: MapService
  ) {
    const { projectId, editMode } = this.getProjectIdAndModeFromUrl();
    this.projectId = projectId;
    this.editMode = editMode;
  }

  ngOnInit(): void {
    if (this.projectId || this.projectId === 0) {
      this.getProject(this.projectId);  
    } else {
      this.getNewId();
    }
  }

  getProjectIdAndModeFromUrl(): { projectId: number | null, editMode: boolean } {
    const urlSegments = this.router.url.split('/');
    const lastUrlSegment: string | number = urlSegments[urlSegments.length - 1];
    let projectId: number | null;
    let editMode: boolean = false;

    if (lastUrlSegment === 'create') {
      projectId = null;
    } else if (isOnlyNumbers(lastUrlSegment)) {
      editMode = true;
      projectId = parseInt(lastUrlSegment);
    } else {
      projectId = null;
      this.resourceNotFound();
    }

    return { projectId, editMode };
  }

  async getProject(projectId: number): Promise<void> {
    try {
      const response = await this.supabase.getProjectById(projectId);
      if (response.status === 200) {
        this.project = this.mapService.mapProject(response.data)[0];
      }

      if (response.data.length < 1 || response.status !== 200) {
        this.resourceNotFound();
        return
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.previewUrlFromProject = this.supabase.getImagePublicUrl(this.project?.coverImageUrl); 
    }
  }

  async getNewId(): Promise<void> {
    const newId = await this.supabase.getNewProjectId();
    if (newId !== 0) {
      this.project.id = newId;
    }
  }

  async editProject(): Promise<void> {
    try {
      const response = await this.supabase.editProject(this.project);
      if (response.status === 201) {
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
      const response = await this.supabase.createNewProject(this.project);
      console.log(response);
      if (response.status === 201) {
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
    let imageUrl!: string;
    if (this.imageToAdd) {
      try {
        imageUrl = await this.supabase.createImage(this.imageToAdd);
        if (imageUrl) this.project.coverImageUrl = imageUrl;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async deleteCoverImage(imageFilepath: string): Promise<void> {
    try {
      await this.supabase.deleteImage(imageFilepath);
    } catch (error) {
      console.log(error);
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
        await this.uploadCoverImage();
        await this.createNewProject();
        this.submitLoadingMessage = 'Creazione riuscita';
      } else {
        this.submitLoadingMessage = 'Modifica in corsa'
        if (this.coverImageChanged) {          
          await this.deleteCoverImage(this.project.coverImageUrl);
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
