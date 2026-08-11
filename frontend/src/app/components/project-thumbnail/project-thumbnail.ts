import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../model/model';
import { Router } from '@angular/router';
import { Supabase } from '../../services/supabase-service/supabase';

@Component({
  selector: 'app-project-thumbnail',
  imports: [],
  templateUrl: './project-thumbnail.html',
  styleUrl: './project-thumbnail.css'
})
export class ProjectThumbnail {
  coverImageUrl!: string;
  @Input() project!: Project;

  constructor(
    private router: Router,
    private supabase: Supabase
  ) { }

  goToProject(): void {
    this.router.navigateByUrl(`/projects/${this.project.id}`);
  }

  getCoverImageUrl(coverImageFilePath: string): string {
    let coverImageUrl: string = '';
    coverImageUrl = this.supabase.getImagePublicUrl(coverImageFilePath);

    return coverImageUrl;
  }

}
