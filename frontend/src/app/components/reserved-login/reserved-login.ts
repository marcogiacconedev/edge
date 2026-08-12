import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';
import { LoginRequest, LoginResponse } from '../../model/dto';

@Component({
  selector: 'app-reserved-login',
  imports: [FormsModule],
  templateUrl: './reserved-login.html',
  styleUrl: './reserved-login.css'
})
export class ReservedLogin implements OnInit{
  
  email = ''
  password = ''
  error = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigateByUrl('/reserved/projects');
    }
  }

  async login(): Promise<void> {

    const dto: LoginRequest = {
      username: this.email,
      password: this.password
    }

    try {
      const data: LoginResponse = await this.authService.login(dto);
      console.log(data);
    } catch (error) {
      throw error;
    }

    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/reserved/projects'])
    } else {
      this.error = 'Non è stato possibile effettuare il login :(';
    }
  }

}
