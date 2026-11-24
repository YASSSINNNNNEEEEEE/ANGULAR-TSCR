import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations';

  reservations = signal<any[]>([]);
  enAttente = computed(() => this.reservations().filter(r => r.statut === 'EN_ATTENTE').length);

  constructor(private http: HttpClient) { }

  creer(reservation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservation);
  }

  charger(agenceId: number) {
    this.http.get<any[]>(`${this.apiUrl}/agence/${agenceId}`).subscribe({
      next: (data: any[]) => this.reservations.set(data),
      error: (err: any) => console.error(err)
    });
  }

  parClient(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/client/${clientId}`);
  }

  changerStatut(id: number, statut: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/statut`, { statut });
  }
}