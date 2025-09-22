import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_KEY = 'isLoggedIn';
  private router = inject(Router);

  login() {
    localStorage.setItem(this.AUTH_KEY, 'true');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true'
  }

  logout(){
    localStorage.removeItem(this.AUTH_KEY);
    this.router.navigate(['login'])
  }
}
