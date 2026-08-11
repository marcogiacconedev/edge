import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/model';
import { Supabase } from '../../services/supabase-service/supabase';
import { MapService } from '../../services/map-service/map-service';
import { DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ModalWarning } from "../modal-warning/modal-warning";
import { emptyProject } from '../../utils/blank-objects';
import { orderProjectArray } from '../../utils/utils';


@Component({
  selector: 'app-reserved-projects',
  imports: [DatePipe, ModalWarning, NgClass],
  templateUrl: './reserved-projects.html',
  styleUrl: './reserved-projects.css'
})
export class ReservedProjects implements OnInit {

  projects!: Project[];
  isProjectsLoading: boolean = false;
  projectToDelete: Project = structuredClone(emptyProject);
  deleteProjectMessage!: string;
  isModalOpen: boolean = false;
  isDeletionLoading: boolean = false;
  deletionLoadingCompleted: boolean = false;
  deletionSuccessful: boolean = true;
  constructor(
    private supabase: Supabase,
    private mapService: MapService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  async getProjects(): Promise<void> {
    try {
      this.isProjectsLoading = true;
      const response = await this.supabase.getProjects();
      if (response.status === 200) {
        this.projects = this.mapService.mapProject(response.data);
        this.projects = orderProjectArray(this.projects);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.isProjectsLoading = false;
    }
  }

  editProject(project: Project): void {
    this.router.navigateByUrl(`/reserved/projects/${project.id}`);
  }

  createNewProject(): void {
    this.router.navigateByUrl('/reserved/projects/create');
  }

  managePhotos(project: Project): void {
    this.router.navigateByUrl(`/reserved/projects/${project.id}/photos`);
  }

  openWarningModal(project: Project): void {
    this.projectToDelete = project;
    this.isModalOpen = true;
  }

  closeWarningModal(): void {
    this.isDeletionLoading = false;
    this.deletionLoadingCompleted = true;
    this.getProjects();
    setTimeout(() => {
      this.deletionLoadingCompleted = false;
      this.isModalOpen = false;
    }, 2000)
  }

  receiveModalAction(action: boolean): void {
    if (action) {
      this.deleteProject(this.projectToDelete);
    } else {
      this.isModalOpen = false;
    }
  }

  async deleteProject(project: Project): Promise<void> {
    try {
      this.isDeletionLoading = true;
      const response = await this.supabase.deleteProject(project.id);     //cancella i metadati del progetto
      if (response.status === 200){
        this.deletionSuccessful = true;
        this.deleteProjectMessage = 'Eliminazione avvenuta con successo!';
      } else {
        this.deletionSuccessful = false;
        this.deleteProjectMessage = 'Eliminazione non riuscita :(';
      }
  
      await this.supabase.deleteProjectImages(project.id);                //cancella le immagini dal progetto (storage)
      await this.supabase.deleteImage(project.coverImageUrl);             //cancella la cover del progetto (storage)
      await this.supabase.deleteProjectPhotos(project.id);                //cancella le foto del progetto (metadati)
    } catch (error) {
      console.log(error);
    } finally {
      this.closeWarningModal();
    } 
  }

  logOut(): void {
    this.supabase.signOut();
    this.router.navigateByUrl('/reserved');
  }
}
