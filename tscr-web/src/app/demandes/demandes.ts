import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { ReservationService } from '../reservation-service';
import { VoitureService } from '../voiture';

@Component({
  selector: 'app-demandes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demandes.html',
  styleUrls: ['./demandes.css']
})
export class DemandesComponent implements OnInit {
  voitures = signal<any[]>([]);

  constructor(
    private auth: AuthService,
    private resa: ReservationService,
    private voitureService: VoitureService,
    private router: Router
  ) {}

  ngOnInit() {
    const u = this.auth.user();
    if (!u || u.role !== 'AGENCE') {
      this.router.navigate(['/voitures']);
      return;
    }
    this.resa.charger(u.id);
    this.voitureService.getAllVoitures().subscribe(data => this.voitures.set(data));
  }

  // the list shown on the page: newest first
  liste() {
    return [...this.resa.reservations()].sort((a, b) => b.id - a.id);
  }

  // turns vehiculeId 9 into "Mercedes CLA"
  nomVoiture(id: number): string {
    const v = this.voitures().find(x => x.id === id);
    return v ? `${v.marque} ${v.modele}` : `Véhicule #${id}`;
  }

  // Accepter / Refuser buttons
  repondre(id: number, statut: string) {
    this.resa.changerStatut(id, statut).subscribe(() => {
      this.resa.charger(this.auth.user().id);
    });
  }
}