// FILE: src/app/mes-reservations/mes-reservations.ts
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { ReservationService } from '../reservation-service';
import { VoitureService } from '../voiture';

@Component({
  selector: 'app-mes-reservations',
  standalone: true,
  templateUrl: './mes-reservations.html',
  styleUrls: ['./mes-reservations.css']
})
export class MesReservationsComponent implements OnInit {
  liste = signal<any[]>([]);
  voitures = signal<any[]>([]);

  constructor(
    private auth: AuthService,
    private resa: ReservationService,
    private voitureService: VoitureService,
    private router: Router
  ) {}

  ngOnInit() {
    const u = this.auth.user();
    if (!u) {
      this.router.navigate(['/login']);
      return;
    }

    this.voitureService.getAllVoitures().subscribe(data => this.voitures.set(data));

    this.resa.parClient(u.id).subscribe(data => {
      this.liste.set([...data].sort((a, b) => b.id - a.id));
    });
  }

  nomVoiture(id: number): string {
    const v = this.voitures().find(x => x.id === id);
    return v ? `${v.marque} ${v.modele}` : `Véhicule #${id}`;
  }
}