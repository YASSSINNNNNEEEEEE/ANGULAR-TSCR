// FILE: src/app/app.ts (replace)
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { timer } from 'rxjs';
import { AuthService } from './auth';
import { ReservationService } from './reservation-service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'tscr-web';

  constructor(
    private router: Router,
    public auth: AuthService,
    public resa: ReservationService
  ) {
    // every 10 seconds, an agency account checks for new requests
    timer(0, 10000).subscribe(() => {
      const u = this.auth.user();
      if (u && u.role === 'AGENCE') {
        this.resa.charger(u.id);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToVoitures() {
    this.router.navigate(['/voitures']);
  }

  goToDemandes() {
    this.router.navigate(['/demandes']);
  }
  goToMesReservations() {
    this.router.navigate(['/mes-reservations']);
  }
  logout() {
    this.auth.logout();
    this.resa.reservations.set([]);
    this.router.navigate(['/login']);
  }
}