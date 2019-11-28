import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
@Injectable()
export class AuthService {
  isLogged:boolean;
  redirectUrl: string;
  
  login() {
    this.isLogged = true
  }

  logout(): void {
    this.isLogged = false;
  }
}
