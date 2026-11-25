// FILE: src/app/signup/signup.ts
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  user: any = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    role: 'CLIENT',
    numeroPermis: '',
    adresse: '',
    nomAgence: '',
    ville: '',
    siteWeb: ''
  };

  errors = signal<Record<string, string>>({});
  message = signal('');
  isError = signal(false);
  tentative = false;

  constructor(private authService: AuthService, private router: Router) {}

  // ---------- ALL THE CONSTRAINTS ARE HERE ----------
  valider(): boolean {
    const u = this.user;
    const e: Record<string, string> = {};

    if (!/^[A-Za-zÀ-ÿ' -]{2,}$/.test(u.nom.trim()))
      e['nom'] = 'Nom obligatoire (2 lettres minimum, lettres uniquement).';

    if (!/^[A-Za-zÀ-ÿ' -]{2,}$/.test(u.prenom.trim()))
      e['prenom'] = 'Prénom obligatoire (2 lettres minimum, lettres uniquement).';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(u.email.trim()))
      e['email'] = 'Email invalide.';

    if (u.motDePasse.length < 8 || !/[A-Za-z]/.test(u.motDePasse) || !/[0-9]/.test(u.motDePasse))
      e['motDePasse'] = '8 caractères minimum, avec une lettre et un chiffre.';

    if (!/^[0-9]{8}$/.test(u.telephone.trim()))
      e['telephone'] = 'Le téléphone doit contenir exactement 8 chiffres.';

    if (u.role === 'CLIENT') {
      if (u.numeroPermis.trim().length < 4)
        e['numeroPermis'] = 'Numéro de permis obligatoire (4 caractères minimum).';
      if (u.adresse.trim().length < 5)
        e['adresse'] = 'Adresse obligatoire (5 caractères minimum).';
    }

    if (u.role === 'AGENCE') {
      if (u.nomAgence.trim().length < 2)
        e['nomAgence'] = "Nom de l'agence obligatoire.";
      if (u.ville.trim().length < 2)
        e['ville'] = 'Ville obligatoire.';
      if (u.siteWeb.trim() && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/.*)?$/.test(u.siteWeb.trim()))
        e['siteWeb'] = 'Site web invalide.';
    }

    this.errors.set(e);
    return Object.keys(e).length === 0;
  }

  // refresh the red messages while typing, only after the first click
  onChange() {
    if (this.tentative) this.valider();
  }

  onSignup() {
    this.tentative = true;

    if (!this.valider()) {
      this.isError.set(true);
      this.message.set('Veuillez corriger les champs en rouge.');
      return;
    }

    this.authService.signup(this.user).subscribe({
      next: () => {
        this.isError.set(false);
        this.message.set('Inscription réussie ! Redirection...');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.isError.set(true);
        this.message.set('Inscription impossible (email déjà utilisé ?).');
      }
    });
  }
}