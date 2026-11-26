// FILE: src/app/app.routes.ts (replace everything)
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { VoituresComponent } from './voitures/voitures';
import { VoitureDetailComponent } from './voiture-detail/voiture-detail';
import { DemandesComponent } from './demandes/demandes';
import { MesReservationsComponent } from './mes-reservations/mes-reservations';
import { ProfilClientComponent } from './profil-client/profil-client';
import { ProfilAgenceComponent } from './profil-agence/profil-agence';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'voitures', component: VoituresComponent },
  { path: 'voitures/:id', component: VoitureDetailComponent },
  { path: 'demandes', component: DemandesComponent },
  { path: 'mes-reservations', component: MesReservationsComponent },
  { path: 'profil-client', component: ProfilClientComponent },
  { path: 'profil-agence', component: ProfilAgenceComponent }
];