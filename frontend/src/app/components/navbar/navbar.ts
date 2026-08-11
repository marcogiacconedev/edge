import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  @Input() linkDarRenderizzare: string[] = [];
  isMenuVisible: boolean = false;
  @Output() onMenuVisibilityChange = new EventEmitter<boolean>();

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  openMenu(): void {
    console.log('opening menu');
    this.isMenuVisible = true;
    this.onMenuVisibilityChange.emit(true);
  }
  
  closeMenu(): void {
    this.isMenuVisible = false;
    this.onMenuVisibilityChange.emit(false);
  }

  goToHomePage(): void {
      this.router.navigateByUrl('/home');
  }

  goToAboutPage(): void {
    this.router.navigateByUrl('/about');
  }

  goToProjectsPage(): void {
    this.router.navigateByUrl('/projects');
  }

  goToLogin(): void {
    this.router.navigateByUrl('/reserved');
  }

}
