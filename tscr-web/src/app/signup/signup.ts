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
  tentative = false; // becomes true after the first click on "S'inscrire"

  constructor(private authService: AuthService, private router: Router) {}

  // ---------- ALL THE CONSTRAINTS ARE HERE ----------
  valider(): boolean {
    const u = this.user;
    const e: Record<string, string> = {};

    const lettres = /^[A-Za-zÀ-ÿ' -]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const siteRegex = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/.*)?$/;

    // Nom
    if (!u.nom.trim()) e['nom'] = 'Le nom est obligatoire.';
    else if (u.nom.trim().length < 2) e['nom'] = 'Minimum 2 caractères.';
    else if (!lettres.test(u.nom)) e['nom'] = 'Lettres uniquement.';

    // Prénom
    if (!u.prenom.trim()) e['prenom'] = 'Le prénom est obligatoire.';
    else if (u.prenom.trim().length < 2) e['prenom'] = 'Minimum 2 caractères.';
    else if (!lettres.test(u.prenom)) e['prenom'] = 'Lettres uniquement.';

    // Email
    if (!u.email.trim()) e['email'] = "L'email est obligatoire.";
    else if (!emailRegex.test(u.email)) e['email'] = 'Email invalide.';

    // Mot de passe
    if (!u.motDePasse) e['motDePasse'] = 'Le mot de passe est obligatoire.';
    else if (u.motDePasse.length < 8) e['motDePasse'] = 'Minimum 8 caractères.';
    else if (!/[A-Za-z]/.test(u.motDePasse) || !/[0-9]/.test(u.motDePasse))
      e['motDePasse'] = 'Au moins une lettre et un chiffre.';

    // Téléphone
    if (!u.telephone.trim()) e['telephone'] = 'Le téléphone est obligatoire.';
    else if (!/^[0-9]{8}$/.test(u.telephone)) e['telephone'] = 'Exactement 8 chiffres.';

    // Client
    if (u.role === 'CLIENT') {
      if (!u.numeroPermis.trim()) e['numeroPermis'] = 'Le numéro de permis est obligatoire.';
      else if (u.numeroPermis.trim().length < 4) e['numeroPermis'] = 'Minimum 4 caractères.';

      if (!u.adresse.trim()) e['adresse'] = "L'adresse est obligatoire.";
      else if (u.adresse.trim().length < 5) e['adresse'] = 'Minimum 5 caractères.';
    }

    // Agence
    if (u.role === 'AGENCE') {
      if (!u.nomAgence.trim()) e['nomAgence'] = "Le nom de l'agence est obligatoire.";
      else if (u.nomAgence.trim().length < 2) e['nomAgence'] = 'Minimum 2 caractères.';

      if (!u.ville.trim()) e['ville'] = 'La ville est obligatoire.';
      else if (u.ville.trim().length < 2) e['ville'] = 'Minimum 2 caractères.';

      if (u.siteWeb.trim() && !siteRegex.test(u.siteWeb.trim()))
        e['siteWeb'] = 'Site web invalide.';
    }

    this.errors.set(e);
    return Object.keys(e).length === 0;
  }

  // called on every keystroke: refresh the errors only after the first attempt
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
      error: (err) => {
        console.error(err);
        this.isError.set(true);
        this.message.set('Inscription impossible (email déjà utilisé ?).');
      }
    });
  }
}