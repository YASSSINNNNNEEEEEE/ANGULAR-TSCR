import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { VoituresComponent } from './voitures/voitures';
import { VoitureDetailComponent } from './voiture-detail/voiture-detail';
import { DemandesComponent } from './demandes/demandes';
import { MesReservationsComponent } from './mes-reservations/mes-reservations';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'voitures', component: VoituresComponent },
  { path: 'voitures/:id', component: VoitureDetailComponent },
  { path: 'demandes', component: DemandesComponent },
  { path: 'mes-reservations', component: MesReservationsComponent }
];