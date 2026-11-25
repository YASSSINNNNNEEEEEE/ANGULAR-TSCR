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
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.voitureService.getVoitureById(id).subscribe({
      next: (data) => {
        this.voiture.set(data);
        this.chargement.set(false);
      },
      error: (err) => {
        this.chargement.set(false);
      }
    });
  }

  // price per day (with the promotion) x number of days
  calculerTotal() {
    const v = this.voiture();
    if (!v || !this.dateDebut || !this.dateFin) return;

    const jours = (new Date(this.dateFin).getTime() - new Date(this.dateDebut).getTime()) / 86400000;
    const prixJour = v.prixParJour * (1 - v.reduction / 100);

    this.prixTotal = jours > 0 ? jours * prixJour : 0;
  }

  reserver() {
    const user = this.auth.user();
    const v = this.voiture();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    if (!v) return;

    if (this.prixTotal <= 0) {
      this.messageErreur.set(true);
      this.message.set('Veuillez sélectionner des dates valides.');
      return;
    }

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
      error: () => {
        this.messageErreur.set(true);
        this.message.set("La réservation n'a pas pu être enregistrée.");
      }
    });
  }
}