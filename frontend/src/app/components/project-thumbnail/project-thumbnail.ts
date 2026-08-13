import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../model/model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-project-thumbnail',
  imports: [],
  templateUrl: './project-thumbnail.html',
  styleUrl: './project-thumbnail.css'
})
export class ProjectThumbnail implements OnInit {
  @Input() project!: Project;
  coverImageUrl?: string;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.coverImageUrl = `${environment['API_BASE_URL']}/api/projectthumbnails/${this.project.id}/file`;
  }

  goToProject(): void {
    this.router.navigateByUrl(`/projects/${this.project.id}`);
  }
}