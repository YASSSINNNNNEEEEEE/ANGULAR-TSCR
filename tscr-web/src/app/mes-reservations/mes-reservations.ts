import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthService } from '../auth';
import { ReservationService } from '../reservation-service';
import { VoitureService } from '../voiture';

@Component({
  selector: 'app-mes-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mes-reservations.html',
  styleUrls: ['./mes-reservations.css']
})
export class MesReservationsComponent implements OnInit, OnDestroy {
  liste = signal<any[]>([]);
  voitures = signal<any[]>([]);
  private sub?: Subscription;

  constructor(
    private auth: AuthService,
    private resa: ReservationService,
    private voitureService: VoitureService,
    private router: Router
  ) {}

  ngOnInit() {
    const u = this.auth.user();
    if (!u || u.role !== 'CLIENT') {
      this.router.navigate(['/login']);
      return;
    }
    this.voitureService.getAllVoitures().subscribe({
      next: (d: any[]) => this.voitures.set(d),
      error: (e: any) => console.error(e)
    });
    // refresh every 10 seconds so the answer of the agency appears by itself
    this.sub = timer(0, 10000).subscribe(() => {
      this.resa.parClient(u.id).subscribe({
        next: (data: any[]) => this.liste.set([...data].sort((a, b) => b.id - a.id)),
        error: (e: any) => console.error(e)
      });
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  nomVoiture(id: number): string {
    const v = this.voitures().find(x => x.id === id);
    return v ? `${v.marque} ${v.modele}` : `Véhicule #${id}`;
  }
}