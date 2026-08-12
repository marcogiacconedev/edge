import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/model';
import { MapService } from '../../services/map-service/map-service';
import { DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ModalWarning } from "../modal-warning/modal-warning";
import { emptyProject } from '../../utils/blank-objects';
import { orderProjectArray } from '../../utils/utils';
import { ProjectService } from '../../services/project-service/project-service';
import { ProjectResponse } from '../../model/dto';
import { AuthService } from '../../services/auth-service/auth-service';


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
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  async getProjects(): Promise<void> {
    try {
      this.isProjectsLoading = true;
      const response: ProjectResponse[] = await this.projectService.getProjects();
      this.projects = response.map(responseProject => {return new Project(responseProject)});
    } catch (error) {
      throw error;
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
      const response = await this.projectService.deleteProject(project.id);     //cancella i metadati del progetto
    } catch (error) {
      throw error;
    } finally {
      this.closeWarningModal();
    } 
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/reserved');
  }
}
