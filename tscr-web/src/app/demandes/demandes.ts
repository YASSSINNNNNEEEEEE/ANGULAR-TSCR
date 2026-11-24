// FILE: src/app/demandes/demandes.ts (NEW)
import { Component, OnInit, signal, computed } from '@angular/core';
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

  // pending requests first, then the newest
  liste = computed(() =>
    [...this.resa.reservations()].sort((a, b) => {
      if (a.statut === 'EN_ATTENTE' && b.statut !== 'EN_ATTENTE') return -1;
      if (a.statut !== 'EN_ATTENTE' && b.statut === 'EN_ATTENTE') return 1;
      return b.id - a.id;
    })
  );

  constructor(
    public auth: AuthService,
    public resa: ReservationService,
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
    this.voitureService.getAllVoitures().subscribe({
      next: (data: any[]) => this.voitures.set(data),
      error: (err: any) => console.error(err)
    });
  }

  nomVoiture(id: number): string {
    const v = this.voitures().find(x => x.id === id);
    return v ? `${v.marque} ${v.modele}` : `Véhicule #${id}`;
  }

  repondre(id: number, statut: string) {
    this.resa.changerStatut(id, statut).subscribe({
      next: () => this.resa.charger(this.auth.user().id),
      error: (err: any) => console.error(err)
    });
  }
}