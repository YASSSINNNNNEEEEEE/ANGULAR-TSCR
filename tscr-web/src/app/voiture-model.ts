// FILE: src/app/voiture-model.ts (replace)
export interface Voiture {
  id: number;
  agenceId?: number;
  marque: string;
  modele: string;
  immatriculation: string;
  photoUrl: string;
  prixParJour: number;
  ville: string;
  carburant: string;
  transmission: string;
  reduction: number;
}