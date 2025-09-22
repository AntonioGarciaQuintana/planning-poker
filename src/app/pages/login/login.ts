import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [

  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
 private authService = inject(AuthService);
 private router = inject(Router);

 login() {
  this.authService.login();
  this.router.navigate(['home'])
 }

}
