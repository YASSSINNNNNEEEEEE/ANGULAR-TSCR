// FILE: src/app/auth.ts (replace everything)
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  user = signal<any>(JSON.parse(localStorage.getItem('user') || 'null'));

  constructor(private http: HttpClient) { }

  login(email: string, motDePasse: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, motDePasse }).pipe(
      tap((res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.user.set(res);
      })
    );
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // saves the profile, then refreshes the logged-in user everywhere
  modifierProfil(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.user.set(res);
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.user.set(null);
  }
}