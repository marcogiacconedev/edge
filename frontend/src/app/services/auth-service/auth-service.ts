import { Injectable, signal } from '@angular/core';
import dotenv from 'dotenv';
import { User } from '../../model/model';
import { LoginRequest, LoginResponse } from '../../model/dto';

dotenv.config();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username = signal<string | null>(null);
  private token = signal<string | null>(null);

  public isUserAuthenticated(): boolean {
    if (localStorage.getItem('edgeJWT')) return true;
    else return false;
  }

  public getToken(): string | null {
    return this.token();
  }

  async login(dto: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${process.env['API_BASE_URL']}/auth/login`, {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(dto)
      });

      if (!response.ok) {
        throw new Error('Login fallito')
      }

      const data: LoginResponse = await response.json();
      this.token.set(data.token);
      localStorage.setItem('edgeJWT', this.token() ?? '');

      return data;
    } catch (error) {
      throw error;
    }
  }

  public logout(): void {
    this.token.set(null);
    localStorage.removeItem('edgeJWT');
  }
}
