// FILE: src/app/voiture-detail/voiture-detail.ts
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VoitureService } from '../voiture';
import { ReservationService } from '../reservation-service';
import { AuthService } from '../auth';
import { Voiture } from '../voiture-model';

@Component({
  selector: 'app-voiture-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './voiture-detail.html',
  styleUrls: ['./voiture-detail.css']
})
export class VoitureDetailComponent implements OnInit {
  voiture = signal<Voiture | null>(null);
  chargement = signal(true);
  erreur = signal('');

  message = signal('');
  messageErreur = signal(false);

  dateDebut = '';
  dateFin = '';
  prixTotal = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voitureService: VoitureService,
    private reservationService: ReservationService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (isNaN(id)) {
        this.chargement.set(false);
        this.erreur.set('Identifiant de véhicule invalide.');
        return;
      }

      this.chargement.set(true);
      this.erreur.set('');

      this.voitureService.getVoitureById(id).subscribe({
        next: (data: Voiture) => {
          this.voiture.set(data);
          this.prixTotal = 0;
          this.message.set('');
          this.chargement.set(false);
        },
        error: (err: any) => {
          console.error('Error loading car:', err);
          this.erreur.set(`Impossible de charger ce véhicule (erreur ${err.status}).`);
          this.chargement.set(false);
        }
      });
    });
  }

  calculerTotal() {
    const v = this.voiture();
    if (!v || !this.dateDebut || !this.dateFin) return;

    const debut = new Date(this.dateDebut);
    const fin = new Date(this.dateFin);
    const jours = Math.ceil((fin.getTime() - debut.getTime()) / (1000 * 3600 * 24));

    if (jours > 0) {
      let prix = v.prixParJour;
      if (v.reduction > 0) {
        prix = prix - (prix * v.reduction / 100);
      }
      this.prixTotal = jours * prix;
    } else {
      this.prixTotal = 0;
    }
  }

  reserver() {
    const user = this.auth.user();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    const v = this.voiture();
    if (!v) return;

    if (!this.dateDebut || !this.dateFin || this.prixTotal <= 0) {
      this.messageErreur.set(true);
      this.message.set('Veuillez sélectionner des dates valides.');
      return;
    }

    // FILE: src/app/voiture-detail/voiture-detail.ts (replace only this block)
    const reservation = {
      vehiculeId: v.id,
      clientId: user.id,
      agenceId: v.agenceId,
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      prixTotal: this.prixTotal
    };

    this.reservationService.creer(reservation).subscribe({
      next: () => {
        this.messageErreur.set(false);
        this.message.set(`Réservation enregistrée pour la ${v.marque} ${v.modele} ! Total : ${this.prixTotal} DT`);
        this.dateDebut = '';
        this.dateFin = '';
        this.prixTotal = 0;
      },
      error: (err: any) => {
        console.error(err);
        this.messageErreur.set(true);
        this.message.set("La réservation n'a pas pu être enregistrée.");
      }
    });
  }
}