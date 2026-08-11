import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-to-projects',
  imports: [],
  templateUrl: './go-to-projects.html',
  styleUrl: './go-to-projects.css',
})
export class GoToProjects {

  constructor(
    private router: Router
  ) {}

  goToProjects(): void{
   this.router.navigateByUrl('/reserved/projects');
  }
}
