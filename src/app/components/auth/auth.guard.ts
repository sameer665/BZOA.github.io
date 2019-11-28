import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../../service/AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router
    
    ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let url: string = state.url;

      return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    console.log(this.authService)
    let p =localStorage.getItem('loginUser')
    if(p){
      return true;
    }
    // if (this.authService.isLogged) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    
    // Navigate to the login page with extras
    this.router.navigate(['/']);
    return false;
  }
}
