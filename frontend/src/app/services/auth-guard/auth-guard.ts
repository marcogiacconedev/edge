import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Supabase } from '../supabase-service/supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate{

  constructor(
    private supabase: Supabase,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.supabase.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/reserved')
      return false;
    }
  }  
}
