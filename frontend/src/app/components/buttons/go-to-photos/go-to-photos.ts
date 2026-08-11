import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-to-photos',
  imports: [],
  templateUrl: './go-to-photos.html',
  styleUrl: './go-to-photos.css',
})
export class GoToPhotos {

  @Input() projectId!: number;

  constructor(
    private router: Router
  ) {}

  goToPhotos(): void {
    this.router.navigateByUrl(`/reserved/projects/${this.projectId}/photos`);
  }
}
