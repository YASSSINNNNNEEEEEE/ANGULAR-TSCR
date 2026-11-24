// FILE: src/app/voiture.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Voiture } from './voiture-model';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  private apiUrl = 'http://localhost:8080/api/vehicules';

  constructor(private http: HttpClient) { }

  getAllVoitures(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(this.apiUrl);
  }

  getVoitureById(id: number): Observable<Voiture> {
    return this.http.get<Voiture[]>(this.apiUrl).pipe(
      map(liste => {
        const trouve = liste.find(v => v.id === id);
        if (!trouve) {
          throw { status: 404 };
        }
        return trouve;
      })
    );
  }
}