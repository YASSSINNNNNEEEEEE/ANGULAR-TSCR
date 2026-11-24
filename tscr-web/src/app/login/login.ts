// FILE: src/app/login/login.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  motDePasse = '';
  erreur = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.erreur = '';
    this.authService.login(this.email, this.motDePasse).subscribe({
      next: (res: any) => {
        console.log('LOGIN RESPONSE:', res);
        this.router.navigate(['/voitures']);
      },
      error: (err: any) => {
        console.error('LOGIN ERROR:', err);
        this.erreur = 'Email ou mot de passe incorrect.';
      }
    });
  }
}