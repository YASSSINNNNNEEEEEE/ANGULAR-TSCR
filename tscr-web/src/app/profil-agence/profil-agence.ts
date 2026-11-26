// FILE: src/app/profil-agence/profil-agence.ts (replace everything)
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';

@Component({
  selector: 'app-profil-agence',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profil-agence.html',
  styleUrls: ['./profil-agence.css']
})
export class ProfilAgenceComponent implements OnInit {
  form: any = {};
  emailActuel = '';
  errors = signal<Record<string, string>>({});
  message = signal('');
  isError = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const u = this.auth.user();
    if (!u || u.role !== 'AGENCE') {
      this.router.navigate(['/login']);
      return;
    }
    this.emailActuel = u.email;
    this.form = { ...u, email: '', motDePasse: '' };
  }

  valider(): boolean {
    const f = this.form;
    const e: Record<string, string> = {};

    if (!/^[A-Za-zÀ-ÿ' -]{2,}$/.test((f.nom || '').trim()))
      e['nom'] = 'Nom obligatoire (2 lettres minimum).';
    if (!/^[A-Za-zÀ-ÿ' -]{2,}$/.test((f.prenom || '').trim()))
      e['prenom'] = 'Prénom obligatoire (2 lettres minimum).';
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
      e['email'] = 'Email invalide.';
    if (!/^[0-9]{8}$/.test((f.telephone || '').trim()))
      e['telephone'] = 'Le téléphone doit contenir 8 chiffres.';
    if ((f.nomAgence || '').trim().length < 2)
      e['nomAgence'] = "Nom de l'agence obligatoire.";
    if ((f.ville || '').trim().length < 2)
      e['ville'] = 'Ville obligatoire.';
    if ((f.siteWeb || '').trim() && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/.*)?$/.test(f.siteWeb.trim()))
      e['siteWeb'] = 'Site web invalide.';
    if (f.motDePasse && (f.motDePasse.length < 8 || !/[A-Za-z]/.test(f.motDePasse) || !/[0-9]/.test(f.motDePasse)))
      e['motDePasse'] = '8 caractères minimum, avec une lettre et un chiffre.';

    this.errors.set(e);
    return Object.keys(e).length === 0;
  }

  enregistrer() {
    if (!this.valider()) {
      this.isError.set(true);
      this.message.set('Veuillez corriger les champs en rouge.');
      return;
    }

    // blank email = keep the current one
    const data = { ...this.form };
    if (!data.email || !data.email.trim()) delete data.email;

    this.auth.modifierProfil(this.form.id, data).subscribe({
      next: () => {
        this.isError.set(false);
        this.message.set('Profil mis à jour ✔');
        this.form.motDePasse = '';
        this.form.email = '';
        this.emailActuel = this.auth.user().email;
      },
      error: () => {
        this.isError.set(true);
        this.message.set('Modification impossible (email déjà utilisé ?).');
      }
    });
  }
}